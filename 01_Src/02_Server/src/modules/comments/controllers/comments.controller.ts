/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-04 09:52:18
 * @ Description: Comments API routes
 */

/* SUMMARY
    * Nest
    * Dto
    * Services
    * Name: getAll
    * Name: createComment
*/

/* Nest */
import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    HttpException,
    HttpStatus
} from '@nestjs/common';

import { ObjectId } from 'mongodb';
/***/

/* Dto */
import { PublicCommentsDto } from '../dto/public-comments.dto';
import { CreateCommentsDto } from '../dto/create-comments.dto';
/***/

/* Services */
import { FormatService } from 'src/services/format/format.service';
import { CommentsDbService } from '../services/comments-db.service';
import { ProjectsDbService } from '../../projects/services/projects-db.service';
import { TasksDbService } from '../../tasks/services/tasks-db.service';
import { DetailsCommentsDto } from '../dto/details-comments.dto';
/***/

@Controller('/:type/:id/comments')
export class CommentsController{
    constructor(private format: FormatService,
                private commentsDb: CommentsDbService,
                private projectsDb: ProjectsDbService,
                private tasksDb: TasksDbService) {
    }

    /*
    * Name: getAll
    * Description: Get all comments in parent
    * 
    * Params:
    * - type (String): Projects, tasks or tickets
    * - id (ObjectID): Parent id
    * 
    * Return (PublicCommentsDto[]): List of comments
    */
    @Get()
    async getAll(@Param() params): Promise<PublicCommentsDto[]> {
        try {
            const type = {
                projects: "projectsDb",
                tasks: "tasksDb"
            };
            
            if (this[type[params.type]]) {
                await this[type[params.type]].getById(params.id); // Check parent
                let comments = await this.commentsDb.getAllInParent(params.id);
                return this.format.fromArray(comments, PublicCommentsDto); // temp
            } else {
                throw new HttpException('Invalid Url Parameter', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            return error;
        }

    }
    /***/

    /*
    * Name: createComment
    * Description: Create new comment on parent
    * 
    * Body (CreateCommentsDto):
    * - author (String): Author name
    * - content (String): Comment content
    * 
    * Return (DetailsCommentsDto): New comment data
    */
    @Post()
    async createComment(@Param() params, @Body() body: CreateCommentsDto): Promise<DetailsCommentsDto> {
        try {
            const type = {
                projects: "projectsDb",
                tasks: "tasksDb"
            };
            
            if (this[type[params.type]]) {
                let parent = await this[type[params.type]].getById(params.id); // Get parent
                let commentId = await this.commentsDb.insertOne(body.content, params.id); // Insert comment
                let newComment = await this.commentsDb.getById(new ObjectId(commentId)); // Get inserted comment
                
                parent.comments.push(commentId)// Update parent
                await this[type[params.type]].updateOne(params.id, parent);
    
                return this.format.fromObject(newComment, DetailsCommentsDto);
            } else {
                throw new HttpException('Invalid Url Parameter', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            return error;
        }
    }
    /***/
}
