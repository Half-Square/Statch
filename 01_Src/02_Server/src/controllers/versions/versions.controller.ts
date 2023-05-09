/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-23 15:19:55                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-14 13:44:32                               *
 *****************************************************************************/

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
import * as versionsDto from "../../dto/versions.dto";
/***/

/* Services */
import {PrismaService} from "../../prisma.service";
/***/

/* Guards */
import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

@Controller("api")
@UseGuards(ConnectedGuard)
export class VersionsController {

  constructor(private prisma: PrismaService) {}

  private parents = {
    projects: "projectId",
    tasks: "taskId",
    tickets: "ticketId"
  };

  /**
  * Get version from is
  * @param id - versions's ID
  * @returns - the version
  */
  @Get("versions/:id")
  async getVersion(@Param() params): Promise<versionsDto.PublicOutput> {
    try {      
      const res = await this.prisma.version.findUnique({
        where: {id: params.id},
        include: {
          tasks: true,
          tickets: true
        }
      }).catch(() => {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      });

      return new versionsDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Get versions from parent
  * @param projectId - Project's ID
  * @returns - List of all versions related to Project
  */
  @Get("projects/:projectId/versions")
  async getVersions(@Param() params): Promise<versionsDto.PublicOutput[]> {
    try {
      if (!params.projectId) {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      }
      let toFind = { projectId: params.projectId};

      const res = await this.prisma.version.findMany({
        where: toFind
      });
      return res.map((el) => new versionsDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Create new version for parent
  * @param id - Parent's ID
  * @returns - Created version
  */
  @Post("projects/:projectId/versions")
  async addVersion(
    @Param() params,
    @Headers("x-token") token: string,
    @Body() body: versionsDto.CreateInput,
  ): Promise<versionsDto.DetailsOutput> {
    try {
      if (!params.projectId) {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      }
      let user = jwt.verify(token, process.env.SALT);

      let toSave = {name: body.name, projectId: params.projectId};

      const res = await this.prisma.version.create({
        data: toSave,
        include: {tasks: true, tickets: true}
      });
      
      await this.prisma.project.update({
        where: { id: params.projectId },
        data: {
          activitys: {
            create: {
              authorId: user.id,
              action: "creating version "+body.name
            }
          }
        }
      });     

      return new versionsDto.DetailsOutput(res);
    } catch (err) {
      if (err.code == "P2003")
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
      else throw err;
    }
  }
  /***/

  /**
   * Delete version by id 
   */
  @Delete("versions/:id")
  async delete(
    @Param("id") id: string,
    @Headers("x-token") token: string
  ): Promise<{id : string}> {
    try {
      let user = jwt.verify(token, process.env.SALT);

      let res = await this.prisma.version.delete({where: {id: id}, select: { id: true, name: true, projectId: true }}).catch(() => {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      });

      await this.prisma.project.update({
        where: { id: res.projectId },
        data: {
          activitys: {
            create: {
              authorId: user.id,
              action: "deleting version "+res.name
            }
          }
        }
      });  
      return {id: res.id};
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}
