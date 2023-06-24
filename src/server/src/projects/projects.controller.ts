/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-13 14:10:50                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-24 13:40:49                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Guards
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
  Headers,
  HttpException,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import { Project } from "@prisma/client";
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import * as projectsDto from "./projects.dto";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
import { SocketService } from "src/services/socket/socket.service";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected/is-connected.guard";
/***/

@Controller("api/projects")
@UseGuards(IsConnectedGuard)
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
  async create(
    @Body() body: projectsDto.CreateInput,
    @Headers("x-token") token: string): Promise<Project> {
    try {
      const newProject = await this.prisma.project.create({
        data: {
          ...body,
          ownerId: jwt.verify(token, process.env.SALT).id
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
      const project = await this.prisma.project.update({
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
