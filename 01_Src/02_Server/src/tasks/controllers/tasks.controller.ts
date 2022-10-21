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
import { Controller, Get, Param } from '@nestjs/common';
/***/

/* Services */
import { TasksDbService } from '../services/tasks-db.service';
/***/

/* DTO */
import { PublicTasksDto } from '../dto/public-tasks.dto';
/***/

@Controller()
export class TasksController {
    constructor(private tasksDb : TasksDbService) {
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
    async getAllInProject(@Param() params: any): Promise<PublicTasksDto[]> {
        let data = await this.tasksDb.findByProject(params.projectId);
        let ret = [];

        data.forEach((task) => {
            ret.push(new PublicTasksDto());
        });
        
        return ret;
    }
    /***/
}
