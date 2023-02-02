/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-02-01 15:23:55
 * @ Description: Comments endpoint
 */

/* SUMMARY
  * Imports
  * Dto
  * Name: getComments
  * Name: addComment
*/

/* Imports */
import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    HttpException,
    HttpStatus
} from '@nestjs/common';
/***/

/* Dto */
import { PrismaService } from 'src/prisma.service';
import * as commentsDto from '../../dto/comments.dto';
/***/

@Controller('')
export class CommentsController {
    private parents = {
      projects: "projectId",
      tasks: "taskId",
      tickets: "ticketId"
    };

    constructor(private prisma: PrismaService) {
    }

    /*
    * Name: getComments
    * Description: Get comments from parent
    * 
    * @param {string} parent - Parent endpoints name
    * @param {string} id - Parent's ID
    * 
    * @returns {Comment[]} - List of all comments related to parent
    */
    @Get(':parent/:id/comments')
    async getComments(@Param() params: any): Promise<commentsDto.publicOutput[]> {
      try {
        if (!this.parents[params.parent]) {
          throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        let toFind = {};
        toFind[this.parents[params.parent]] = params.id;

        const res = await this.prisma.comment.findMany({
          where: toFind,
        });
        return res.map((el) => new commentsDto.publicOutput(el));
      } catch (err) {
        console.error(`${new Date().toISOString()} - ${err}`);
        throw err;
      }
    }
    /***/
  
    /*
    * Name: addComment
    * Description: Create new comment for parent
    * 
    * @param {string} parent - Parent endpoints name
    * @param {string} id - Parent's ID
    * 
    * @returns {Comment} - Created comment
    */
    @Post(':parent/:id/comments')
    async addComment( @Param() params: any,
                      @Body() body: commentsDto.createInput): Promise<commentsDto.detailsOutput> {
      try {
        if (!this.parents[params.parent]) {
          throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        let toSave = {content: body.content};
        toSave[this.parents[params.parent]] = params.id;

        const res = await this.prisma.comment.create({
          data: toSave
        });
        return new commentsDto.detailsOutput(res);
      } catch (err) {
        if (err.code == 'P2003')
          throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        else
          throw err;
      }
    }
    /***/
}
