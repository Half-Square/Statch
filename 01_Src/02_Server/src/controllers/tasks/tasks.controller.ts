/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-02-21 14:21:47                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-13 13:25:59                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Guards
  * getAll
  * getById
  * update
  * getAllFromProject
  * create
  * delete
*/

/* Imports */
import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpException,
  UseGuards,
  Delete,
  Headers
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import {PrismaService} from "../../prisma.service";
import * as tasksDto from "../../dto/tasks.dto";
/***/

/* Guards */
import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

@Controller("api")
@UseGuards(ConnectedGuard)
export class TasksController {
  constructor(private prisma: PrismaService) {}

  /**
  * Get all tasks in database
  * @returns List of all tasks
  */
  @Get("tasks")
  async getAll(): Promise<tasksDto.PublicOutput[]> {
    try {
      let res = await this.prisma.task.findMany({include: {owner: true}});
      return res.map((el) => new tasksDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Get task by ID
  * @param id - Task's ID to get
  * @returns - Task details
  */
  @Get("tasks/:id")
  async getById(@Param("id") id: string): Promise<tasksDto.DetailsOutput> {
    try {
      let res = await this.prisma.task.findUnique({
        where: {id: id},
        include: {
          targetVersion: true,
          tickets: {
            orderBy: {
              targetVersion: {
                name: "desc"
              }
            },
            include: {
              owner: true,
              targetVersion: true
            }
          },
          comments: {
            include: {author: true}, orderBy: { created: "asc"}
          },
          owner: true,
          assignments: {
            include: {user: true}
          },
          labels: true
        }
      });

      if (res) return new tasksDto.DetailsOutput(res);
      else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Update tasks
  * @param id - Task's ID to update
  * @param body - Data to update 
  * @returns - Updated task's details
  */
  @Put("tasks/:id")
  async update(
    @Param("id") id: string,
    @Body() body: tasksDto.UpdateInput,
  ): Promise<tasksDto.DetailsOutput> {
    try {    
      let res = await this.prisma.task.update({
        where: {id: id},
        data: {
          name: body.name,
          status: body.status,
          level: body.level,
          description: body.description,
          targetVersion: body.targetVersion && body.targetVersion.id ?{
            connect: { id: body.targetVersion.id }
          } : {},
          assignments: {
            deleteMany: {},
            create: body.assignments.map((el) => {
              return {userId: el.id};
            }) 
          },
          labels: {
            deleteMany: {},
            connect: body.labels.map((el) => {
              return { id: el.id };
            })
          }
        },
        include: {
          targetVersion: true,
          tickets: {
            orderBy: {
              targetVersion: { name: "desc" }
            },
            include: {
              owner: true,
              targetVersion: true
            }
          },
          comments: {
            include: {author: true}, orderBy: { created: "asc"}
          },
          owner: true,
          assignments: {
            include: {user: true}
          },
          labels: true
        }
      });
      return new tasksDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Get all tasks in project
   * @param id - Project's ID
   * @returns - Tasks list in project
   */
  @Get("projects/:id/tasks")
  async getAllFromProject(
    @Param("id") id: string,
  ): Promise<tasksDto.PublicOutput[]> {
    try {
      let res = await this.prisma.task.findMany({
        where: {projectId: id},
        include: {owner: true}
      });
      return res.map((el) => new tasksDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Create new task
   * @param id - Project's ID where create task
   * @param body - Creation data
   * @returns (Task) - Task's details
   */
  @Post("projects/:id/tasks")
  async create(
    @Param("id") id: string,
    @Headers("x-token") token: string,
    @Body() body: tasksDto.CreateInput,
  ): Promise<tasksDto.DetailsOutput> {
    try {
      let user = jwt.verify(token, process.env.SALT);
      let res = await this.prisma.task.create({
        data: {
          name: body.name,
          description: body.description,
          projectId: id,
          ownerId: user.id,
          assignments: {
            create: [{
              userId: user.id
            }]
          }
        },
        include: {
          targetVersion: true,
          comments: {
            include: {author: true}, orderBy: { created: "asc"}
          },
          tickets: {
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
          },
          labels: true
        }
      });
      return new tasksDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Delete task by id 
  */
  @Delete("tasks/:id")
  async delete(@Param("id") id: string): Promise<Object> {
    try {
      this.prisma.task.delete({where: {id: id}}).then(()=>{
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
}
