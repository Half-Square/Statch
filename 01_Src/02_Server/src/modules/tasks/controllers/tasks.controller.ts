/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 10:07:42
 * @ Description: Manage tasks API endpoint
 */

/* SUMMARY
    * Nest
    * Services
    * DTO
    * Name: getAllInproject
*/

/* Nest */
import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ObjectId } from "mongodb";
/***/

/* Services */
import { TasksDbService } from '../services/tasks-db.service';
/***/

/* DTO */
import { PublicTasksDto } from '../dto/public-tasks.dto';
import { FormatService } from 'src/services/format/format.service';
import { ProjectsDbService } from 'src/modules/projects/services/projects-db.service';
/***/

@Controller()
export class TasksController {
    constructor(private tasksDb : TasksDbService,
                private projectsDb: ProjectsDbService,
                private format: FormatService) {
    }

    /*
    * Name: getAllInproject
    * Description: Get all project's tasks
    * 
    * Params:
    * - projectId (Number): Project ID
    * 
    * Return (PublicTasksDto[]): Tasks list
    */
    @Get('/projects/:projectId/tasks')
    async getAllInProject(@Param() params): Promise<PublicTasksDto[]> {
        try {
            await this.projectsDb.findById(params.projectId);
            let data = await this.tasksDb.findByProject(params.projectId);    
            return this.format.fromArray(data, PublicTasksDto);  
        } catch (error) {
            return error;
        }
    }
    /***/
}
