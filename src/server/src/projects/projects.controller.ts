/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-13 14:10:50                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-19 17:43:24                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Get all projects
  * Get on project by id
  * Create new project
  * Update project
*/

/* Imports */
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { Project } from "@prisma/client";
/***/

/* Dto */
import * as projectsDto from "./projects.dto";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
import { SocketService } from "src/services/socket/socket.service";
/***/

@Controller("api/projects")
export class ProjectsController {
  constructor(private prisma: PrismaService,
              private socket: SocketService) {
  }

  /**
  * Get all projects
  * @return - Projects list 
  */
  @Get()
  async getAll(): Promise<Project[]> {
    try {
      return await this.prisma.project.findMany();
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Get on project by id
  * @param id - Project's id to get
  * @return - Project data 
  */
  @Get(":id")
  async getById(@Param("id") id: string): Promise<Project> {
    try {
      const ret = await this.prisma.project.findUnique({where: {id: id}});
      if (ret) return ret;
      else throw new HttpException(`Project ${id} Not Found`, HttpStatus.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Create new project
  * @param data - New project data 
  */
  @Post()
  async create(@Body() body: projectsDto.CreateInput): Promise<Project> {
    try {
      let newProject = await this.prisma.project.create({
        data: {
          ...body,
          ownerId: "Mv7chynw"
        }
      });

      this.socket.broadcast("projects", newProject);
      return newProject;
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Update project
  * @param id - Project to update
  * @param body - Data to update 
  */
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: projectsDto.UpdateInput): Promise<Project> {
    try {
      let project = await this.prisma.project.update({
        where: {id: id},
        data: body
      });

      this.socket.broadcast("projects", project);
      return project;
    } catch (err) {
      throw err;
    }
  }
  /***/
}
