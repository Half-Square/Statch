/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:21:24                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-31 15:02:49                               *
 *****************************************************************************/

/* SUMMARY
 * Imports
 * Dto
 * Guards
 * getAll
 * getOne
 * update
 * create
 */

/* Imports */
import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  UseGuards,
  Delete
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import {PrismaService} from "../../prisma.service";
import * as projectsDto from "../../dto/projects.dto";
/***/

/* Guards */
import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

@Controller("api/projects")
@UseGuards(ConnectedGuard)
export class ProjectsController {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all projects
   * @returns - List of all projects
   */
  @Get("")
  async getAll(): Promise<projectsDto.PublicOutput[]> {
    try {
      const res = await this.prisma.project.findMany({include: {owner: true}});
      return res.map((el) => new projectsDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Get one project by ID
   * @param id - Project's ID to get
   * @returns - Project details
   */
  @Get("/:id")
  async getOne(@Param("id") id: string,
               @Headers("x-token") token: string
  ): Promise<projectsDto.DetailsOutput> {
    try {     
      let user = jwt.verify(token, process.env.SALT);

      const res = await this.prisma.project.findUnique({
        where: {
          id: id
        },
        include: {
          comments: {
            include: {author: true}, orderBy: { created: 'asc'},
          },
          versionList: true,
          tasks: {
            orderBy: {
              targetVersion: { name: "desc" }
            },
            include: {
              owner: true,
              targetVersion: true
            }
          },
          owner: true,
          assignments: {
            include: {user: true}
          }
        }
      });      
      if (res) return new projectsDto.DetailsOutput({ ...res, isAssigned: this.isAssigned(res, user) });
      else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Update project
   * @param id - Project's ID to update
   * @param body - Data to update
   * @returns - Updated project
   */
  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body() body: projectsDto.UpdateInput,
    @Headers("x-token") token: string
  ): Promise<projectsDto.DetailsOutput> {
    try {
      let user = jwt.verify(token, process.env.SALT);

      let res = await this.prisma.project.update({
        where: {
          id: id
        },
        data: {
          name: body.name,
          status: body.status,
          actualVersion: body.actualVersion,
          description: body.description,
          assignments: {
            deleteMany: {},
            create: body.assignments.map((el) => {
              return {userId: el.id};
            })
          }
        },
        include: {
          versionList: true,
          tasks: {
            orderBy: {
              targetVersion: { name: "desc" }
            },
            include: {
              owner: true,
              targetVersion: true
            }
          },
          comments: {
            include: {author: true}, orderBy: { created: 'asc'},          
          },
          owner: true,
          assignments: {
            include: {user: true}
          }
        }
      });
      
      return new projectsDto.DetailsOutput({ ...res, isAssigned: this.isAssigned(res, user) });
    } catch (err) {
      if (err.code === "P2025") {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      }

      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Create project
   * @param body - Data to update
   * @returns {Project} - Updated project
   */
  @Post("")
  async create(
    @Body() body: projectsDto.CreateInput,
    @Headers("x-token") token: string,
  ): Promise<projectsDto.DetailsOutput> {
    try {
      let user = jwt.verify(token, process.env.SALT);
      
      const res = await this.prisma.project.create({
        data: {
          ...body,
          ownerId: user.id,
          assignments: {
            create: [{
              userId: user.id
            }]
          }
        },
        include: {
          comments: {
            include: {author: true}, orderBy: { created: 'asc'},
          },
          tasks: {
            orderBy: {
              targetVersion: { name: "desc" }
            },
            include: {
              owner: true,
              targetVersion: true
            }
          },
          owner: true,
          assignments: {
            include: {user: true}
          }
        }
      });
      return new projectsDto.DetailsOutput({ ...res, isAssigned: this.isAssigned(res, user) });
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Delete project by id 
  */
  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<Object> {
    try {
      this.prisma.project.delete({where: {id: id}})
      .then(()=>{
        return {id: id};
      }).catch(() => {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      });
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
    return {id: ""};
  }
  /***/


  private isAssigned(res, user): boolean {
    if (res.owner.id == user.id) return true;

    if (res.assignments)
      for (let i = 0; i < res.assignments.length; i++) {
        if (res.assignments[i].user && res.assignments[i].user.id == user.id) {
          return true
        }
      }

    if (res.tasks)
      for (let j = 0; j < res.tasks.length; j++) {
        if (res.tasks[j].assignments)
          for (let i = 0; i < res.tasks[j].assignments.length; i++) {
            if (res.tasks[j].assignments[i].user && res.tasks[j].assignments[i].user.id == user.id) {
              return true
            }
          }
      }
      
    return false;
  }
}
