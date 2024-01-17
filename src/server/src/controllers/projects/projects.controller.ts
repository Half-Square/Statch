/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-06-13 14:10:50                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 14:39:22                               *
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
  * Delete project
*/

/* Imports */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  SetMetadata
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
import { PermsService } from "src/services/perms/perms.service";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
import { IsPermissionsGuard } from "src/guards/is-perms.guard";
/***/

/* Interceptors */
import { ActivitiesInterceptor } from "../activities/activities.interceptor";
/***/

@Controller("api/projects")
@UseGuards(IsConnectedGuard)
export class ProjectsController {
  constructor(private prisma: PrismaService,
              private socket: SocketService,
              private perm: PermsService) {
  }

  /**
  * Get all projects
  * @return - Projects list 
  */
  @Get()
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "projects", actions: ["view"]}])
  async getAll(): Promise<Project[]> {
    try {
      return await this.prisma.project.findMany({
        include: {
          labels: true,
          assignments: true
        }
      });
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
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "projects", actions: ["view"]}])
  async getById(@Param("id") id: string): Promise<Project> {
    try {
      const ret = await this.prisma.project.findUnique({
        where: {id: id},
        include: {
          labels: true
        }
      });
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
  @UseInterceptors(ActivitiesInterceptor)
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "projects", actions: ["create"]}])
  async create(
    @Body() body: projectsDto.CreateInput,
    @Headers("x-token") token: string): Promise<Project> {
    try {
      const user = jwt.verify(token, process.env.SALT);
      const newProject = await this.prisma.project.create({
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
          labels: true,
          assignments: true
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
  @UseInterceptors(ActivitiesInterceptor)
  async update(
    @Param("id") id: string,
    @Body() body: projectsDto.UpdateInput,
    @Headers("x-token") token: string): Promise<Project | { perm: boolean; message: string; }> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: jwt.verify(token, process.env.SALT).id },
        include: {
          role: true
        }
      });

      const canUpdate = await this.perm.updateData(
        body, 
        id, 
        "projects", 
        user, 
        ["assignments", "actualVersion", "status", "labels", "level", "title", "description"]);
      
      if(canUpdate) {
        const project = await this.prisma.project.update({
          where: {id: id},
          data: {
            ...body,
            assignments: body.assignments ? {
              deleteMany: {},
              create: body.assignments.map((el) => {
                return {userId: el.userId};
              })
            } : undefined,
            labels: body.labels ? {
              deleteMany: {},
              create: body.labels.map((el) => {
                return {labelId: el.labelId};
              })
            } : undefined
          },
          include: {
            labels: true,
            assignments: true
          }
        });
  
        this.socket.broadcast("projects", project);
        return project;
      } else {
        throw new HttpException("You do not have the necessary permission to perform this action", HttpStatus.NOT_MODIFIED);
      }
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Delete project
  * @param id - Project to delete
  * @return - Message success 
  */
  @Delete(":id")
  @UseInterceptors(ActivitiesInterceptor)
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "projects", actions: ["delete"]}])
  async deleteById(@Param("id") id: string): Promise<{message: string}> {
    try {
      await this.prisma.project.delete({where: {id: id}});
      this.socket.broadcast("projects", {id: id}, true);

      return {message: `Project ${id} deleted`};
    } catch (err) {
      throw err;
    }
  }
  /***/
}
