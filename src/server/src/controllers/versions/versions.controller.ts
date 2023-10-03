/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-21 12:01:16                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-02 11:12:55                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Guards
  * Dto
  * Interceptors
  * Get all
  * Get by id
  * Get version for current project
  * Create new version
  * Edit version
  * Delete version
*/

/* Imports */
import {
  Controller,
  UseGuards,
  HttpException,
  HttpStatus,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors
} from "@nestjs/common";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
import { SocketService } from "src/services/socket/socket.service";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
/***/

/* Dto */
import * as versionsDto from "./versions.dto";
import { Version } from "@prisma/client";
/***/

/* Interceptors */
import { ActivitiesInterceptor } from "../activities/activities.interceptor";
/***/

@Controller("api")
@UseGuards(IsConnectedGuard)
export class VersionsController {
  constructor(private prisma: PrismaService,
              private socket: SocketService) {
  }

  /**
  * Get all
  * @return - Version list
  */
  @Get("versions")
  async getAll(): Promise<Version[]> {
    return await this.prisma.version.findMany();
  }
  /***/

  /**
  * Get by id
  * @Param id - Version to get
  * @return - Version 
  */
  @Get("versions/:id")
  async getById(@Param("id") id: string): Promise<Version> {
    let version = await this.prisma.version.findFirst({where: {id: id}});
    if (version) return version;
    else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }
  /***/

  /**
  * Get version by projects
  * @param id - Project's id
  * @return - List of project's version
  */
  @Get("projects/:id/versions")
  async getVersionsForContext(@Param("id") id: string): Promise<Version[]> {
    return await this.prisma.version.findMany({where: {projectId: id}});
  }
  /***/

  /**
  * Create new version
  * @param body - Version data
  * @param projectId - Project Id 
  */
  @Post("projects/:projectId/versions")
  @UseInterceptors(ActivitiesInterceptor)
  async create( @Param("projectId") projectId: string,
                @Body() body: versionsDto.CreateInput): Promise<Version> {
    let version = await this.prisma.version.create({
      data: {...body, projectId}
    });

    this.socket.broadcast(`projects/${projectId}/versions`, version);
    return version;
  }
  /***/

  /**
  * Edit version
  * @param id - Version to update
  * @param projectId - Parent id
  * @param body - Data to update
  * @return - Updated version 
  */
  @Put("projects/:projectId/versions/:id")
  @UseInterceptors(ActivitiesInterceptor)
  async update(@Param("id") id: string, @Body() body: versionsDto.UpdateInput): Promise<Version> {
    let version = await this.prisma.version.update({
      where: {id: id},
      data: body
    });

    this.socket.broadcast(`projects/${id}/versions`, version);
    return version;
  }
  /***/

  /**
  * Remove version
  * @param id - Version to remove
  * @param projectId - Parent id
  * @return - Message 
  */
  @Delete("projects/:projectId/versions/:id")
  @UseInterceptors(ActivitiesInterceptor)
  async deleteById(@Param("id") id: string): Promise<{message: string}> {
    await this.prisma.version.delete({where: {id: id}});

    this.socket.broadcast(`projects/${id}/versions`, {id: id}, true);
    return {message: `Version ${id} has been removed`};
  }
  /***/
}
