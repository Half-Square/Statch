/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:20:59                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-24 17:17:29                               *
 *****************************************************************************/

/* SUMMARY
 * Imports
 * Dto
 * Services
 * getComments
 * addComment
 * delete
 */

/* Imports */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Delete
} from "@nestjs/common";
import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

/* Dto */
import * as commentsDto from "../../dto/comments.dto";
/***/

/* Services */
import {PrismaService} from "../../prisma.service";
/***/

@Controller("")
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
        where: toFind
      });
      return res.map((el) => new commentsDto.PublicOutput(el));
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
    @Body() body: commentsDto.CreateInput,
  ): Promise<commentsDto.DetailsOutput> {
    try {
      if (!this.parents[params.parent]) {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      }

      let toSave = {content: body.content};
      toSave[this.parents[params.parent]] = params.id;

      const res = await this.prisma.comment.create({
        data: toSave
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