/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-06-24 17:11:00                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 14:37:59                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Guards
  * Interceptors
  * Get comments from parent
  * Create new comment for parent
  * Delete comment
*/

/* Imports */
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Headers,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  UseInterceptors,
  SetMetadata
} from "@nestjs/common";
import { Comment } from "@prisma/client";
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import * as commentsDto from "./comments.dto";
/***/

/* Services */
import { SocketService } from "src/services/socket/socket.service";
import { PrismaService } from "src/prisma.service";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
import { IsPermissionsGuard } from "src/guards/is-perms.guard";
/***/

/* Interceptors */
import { ActivitiesInterceptor } from "../activities/activities.interceptor";
/***/

@Controller("api")
@UseGuards(IsConnectedGuard)
export class CommentsController {
  private parents = {
    projects: "projectId",
    tasks: "taskId",
    tickets: "ticketId"
  };

  constructor(private socket: SocketService,
              private prisma: PrismaService) { 
  }

  /**
   * Get comments from parent
   * @param parent - Parent endpoints name
   * @param id - Parent's ID
   * @returns - List of all comments related to parent
   */
  @Get(":parent/:id/comments")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "pttAll", actions: ["view"]}])
  async getComments(
    @Param("parent") parent: string,
    @Param("id") id: string
  ): Promise<Comment[]> {
    try {
      if (!this.parents[parent]) {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      }

      let toFind = {};
      toFind[this.parents[parent]] = id;

      return await this.prisma.comment.findMany({
        where: toFind
      });
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Create new comment for parent
  * @param parent - Parent endpoints name
  * @param id - Parent's ID
  * @returns - Created comment
  */
  @Post(":parent/:id/comments")
  @UseInterceptors(ActivitiesInterceptor)
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "pttAll", actions: [{type: "comment", actions: ["create"]}]}])
  async addComment(
    @Param("parent") parent: string,
    @Param("id") id: string,
    @Param("parentId") parentId: string,
    @Headers("x-token") token: string,
    @Body() body: commentsDto.CreateInput,
  ): Promise<Comment> {
    try {
      if (!this.parents[parent]) {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      }

      const user = jwt.verify(token, process.env.SALT);
      
      let toSave = {
        ...body,
        authorId: user.id
      };

      toSave[this.parents[parent]] = id;

      const comment = await this.prisma.comment.create({
        data: toSave
      });

      this.socket.broadcast(`${parent}/${id}/comments`, comment);
      return comment;
    } catch (err) {
      if (err.code == "P2003")
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
      else throw err;
    }
  }
  /***/

  /**
  * Delete comment
  * @param parent - Parent endpoints name
  * @param parentId - Parent's ID
  * @param id - Comment to delete
  * @return - Success message 
  */
  @Delete(":parent/:parentId/comments/:id")
  @UseInterceptors(ActivitiesInterceptor)
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "pttAll", actions: [{type: "comment", actions: ["delete"]}]}])
  async deleteById(@Param("parent") parent: string, @Param("id") id: string, @Param("parentId") parentId: string): Promise<{message: string}> {
    try {
      await this.prisma.comment.delete({where: {id: id}});
      this.socket.broadcast(`${parent}/${parentId}/comments`, {id: id}, true);

      return {message: `Comment ${id} deleted`};
    } catch (err) {
      throw err;
    }
  }
  /***/
}
