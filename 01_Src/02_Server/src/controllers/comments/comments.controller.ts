/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-02-21 14:20:59                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-05-11 15:45:25                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * getComments
  * addComment
  * delete
  * Guards
*/

/* Imports */
import {
  Controller,
  Get,
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
import * as commentsDto from "../../dto/comments.dto";
/***/

/* Services */
import {PrismaService} from "../../prisma.service";
/***/

/* Guards */
import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

@Controller("api")
@UseGuards(ConnectedGuard)
export class CommentsController {
  private parents = {
    projects: "projectId",
    tasks: "taskId",
    tickets: "ticketId"
  };
  
  constructor(private prisma: PrismaService) {}

  /**
   * Get comments from parent
   * @param parent - Parent endpoints name
   * @param id - Parent's ID
   * @returns - List of all comments related to parent
   */
  @Get(":parent/:id/comments")
  async getComments(@Param() params): Promise<commentsDto.PublicOutput[]> {
    try {
      if (!this.parents[params.parent]) {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      }

      let toFind = {};
      toFind[this.parents[params.parent]] = params.id;

      const res = await this.prisma.comment.findMany({
        where: toFind,
        include: {author: true}
      });
      return res.map((el) => new commentsDto.PublicOutput(el)).sort((a, b) => a.created.getTime() - b.created.getTime() );
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
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
    @Param() params,
    @Headers("x-token") token: string,
    @Body() body: commentsDto.CreateInput,
  ): Promise<commentsDto.DetailsOutput> {
    try {
      if (!this.parents[params.parent]) {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      }

      let user = jwt.verify(token, process.env.SALT);

      let toSave = {content: body.content, authorId: null};
      toSave[this.parents[params.parent]] = params.id;
      toSave.authorId = user.id;

      const res = await this.prisma.comment.create({
        data: toSave,
        include: {author: true}
      });
      return new commentsDto.DetailsOutput(res);
    } catch (err) {
      if (err.code == "P2003")
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
      else throw err;
    }
  }
  /***/

  /**
  * Delete comment by id 
  */
  @Delete("comments/:id")
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.prisma.comment.delete({where: {id: id}}).catch(() => {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      });
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}