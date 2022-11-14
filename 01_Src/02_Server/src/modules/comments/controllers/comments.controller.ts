/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-04 09:52:18
 * @ Description: Comments API routes
 */

/* SUMMARY
    * Nest
    * Dto
    * Services
    * getAll
*/

/* Nest */
import { Controller, Get, Param } from '@nestjs/common';
/***/

/* Dto */
import { PublicCommentsDto } from '../dto/public-comments.dto';
/***/

/* Services */
import { FormatService } from 'src/services/format/format.service';
import { CommentsDbService } from '../services/comments-db.service';
/***/

@Controller('/:type/:id/comments')
export class CommentsController{
    constructor(private format: FormatService,
                private commentsDb: CommentsDbService) {
    }

    /*
    * Name: getAll
    * Description: Get all comments
    * 
    * Return (PublicCommentsDto[]): List of comments
    */
    @Get()
    async getAll(@Param() params): Promise<PublicCommentsDto[]> {
        try {
            let comments = await this.commentsDb.getAll(params.id);
            return this.format.fromArray(comments, PublicCommentsDto); // temp
        } catch (error) {
            return error;
        }

    }
    /***/
}
