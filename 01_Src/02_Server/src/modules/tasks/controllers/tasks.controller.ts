/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 10:07:42
 * @ Description: Manage tasks API endpoint
 */

/* SUMMARY
    * Nest
    * Services
    * DTO
    * Name: getAllInProject
    * Name: createTask
*/

/* Nest */
import { Controller, Get, Post, HttpException, HttpStatus, Param, Body } from '@nestjs/common';
import { ObjectId } from "mongodb";
/***/

/* Services */
import { TasksDbService } from '../services/tasks-db.service';
/***/

/* DTO */
import { PublicTasksDto } from '../dto/public-tasks.dto';
import { FormatService } from 'src/services/format/format.service';
import { ProjectsDbService } from 'src/modules/projects/services/projects-db.service';
import { DetailsTasksDto } from '../dto/details-tasks.dto';
import { CreateTasksDto } from '../dto/create-tasks.dto';
import { EditProjectsDto } from 'src/modules/projects/dto/edit-projects.dto';
import { ObjectID } from 'typeorm';
/***/

@Controller()
export class TasksController {
    constructor(private tasksDb : TasksDbService,
                private projectsDb: ProjectsDbService,
                private format: FormatService) {
    }

    /*
    * Name: getAllInProject
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
            await this.projectsDb.getById(params.projectId);
            let data = await this.tasksDb.findByProject(params.projectId);
            return data && data.length > 0 ? this.format.fromArray(data, PublicTasksDto) : [];  
        } catch (error) {
            return error;
        }
    }
    /***/

    /*
    * Name: createTask
    * Descrription: Create task in project
    * 
    * Params:
    * - projectId (ObjectId): Parent project ID
    * 
    * Body:
    * - name (String): Task name
    * - description (String): Tasks description
    * 
    * Return (DetailsTasksDto): Created task
    */
    @Post('/projects/:projectId/tasks')
    async createTask(@Param() params, @Body() body: CreateTasksDto): Promise<DetailsTasksDto> {
        try {
            let project = await this.projectsDb.getById(params.projectId);

            let id = await this.tasksDb.insertOne(new ObjectId(project._id), body);
            let newTask = await this.tasksDb.getById(new ObjectId(id));
            
            project.tasks.push(newTask._id);
            await this.projectsDb.updateOne(project._id, new EditProjectsDto(project));

            return this.format.fromObject(newTask, DetailsTasksDto);
        } catch(error) {
            return error;
        }
    }
    /***/
}
