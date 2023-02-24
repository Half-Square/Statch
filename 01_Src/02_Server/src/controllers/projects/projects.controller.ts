/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:21:24                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-24 11:46:15                               *
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
  HttpException,
  HttpStatus,
  UseGuards,
  Delete
} from "@nestjs/common";
/***/

/* Dto */
import {PrismaService} from "../../prisma.service";
import * as projectsDto from "../../dto/projects.dto";
/***/

/* Guards */
import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

@Controller("projects")
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
      const res = await this.prisma.project.findMany();
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
  async getOne(@Param("id") id: string): Promise<projectsDto.DetailsOutput> {
    try {
      const res = await this.prisma.project.findUnique({
        where: {
          id: id
        },
        include: {
          comments: true,
          tasks: true
        }
      });
      if (res) return new projectsDto.DetailsOutput(res);
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
  ): Promise<projectsDto.DetailsOutput> {
    try {
      let res = await this.prisma.project.update({
        where: {
          id: id
        },
        data: body,
        include: {
          tasks: true,
          comments: true
        }
      });
      return new projectsDto.DetailsOutput(res);
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
  ): Promise<projectsDto.DetailsOutput> {
    try {
      const res = await this.prisma.project.create({
        data: body,
        include: {
          comments: true,
          tasks: true
        }
      });
      return new projectsDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Delete project by id 
  */
  @Delete("users/:id")
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.prisma.project.delete({where: {id: id}}).catch(() => {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      });
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}