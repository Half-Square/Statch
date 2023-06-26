/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-24 17:11:00                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-26 14:23:45                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Guards
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
  HttpStatus
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
import { IsConnectedGuard } from "src/guards/is-connected/is-connected.guard";
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
  async addComment(
    @Param("parent") parent: string,
    @Param("id") id: string,
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

      this.socket.broadcast("comments", comment);
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
  * @param id - Comment to delete
  * @return - Success message 
  */
  @Delete("comments/:id")
  async deleteById(@Param("id") id: string): Promise<{message: string}> {
    try {
      await this.prisma.comment.delete({where: {id: id}});
      this.socket.broadcast("comments", {id: id}, true);

      return {message: `Comment ${id} deleted`};
    } catch (err) {
      throw err;
    }
  }
  /***/
}
