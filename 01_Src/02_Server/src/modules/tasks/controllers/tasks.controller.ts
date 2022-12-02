/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 10:07:42
 * @ Description: Manage tasks API endpoint
 */

/* SUMMARY
    * Nest
    * Services
    * DTO
    * Guards
    * Name: getAllInProject
    * Name: createTask
*/

/* Nest */
import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    UseGuards,
    Headers
} from '@nestjs/common';
import { ObjectId } from "mongodb";
/***/

/* Services */
import { TasksDbService } from '../services/tasks-db.service';
import { UsersDbService } from 'src/modules/users/services/users-db.service';
import { FormatService } from 'src/services/format/format.service';
import { ProjectsDbService } from 'src/modules/projects/services/projects-db.service';
/***/

/* DTO */
import { PublicTasksDto } from '../dto/public-tasks.dto';
import { DetailsTasksDto } from '../dto/details-tasks.dto';
import { CreateTasksDto } from '../dto/create-tasks.dto';
import { EditProjectsDto } from 'src/modules/projects/dto/edit-projects.dto';
import { PublicUserDto } from 'src/modules/users/dto/public-user.dto';
/***/

/* Guards */
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
/***/

@Controller()
@UseGuards(AuthGuard)
export class TasksController {
    constructor(private tasksDb : TasksDbService,
                private projectsDb: ProjectsDbService,
                private usersDb: UsersDbService,
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

            let owners_id = data.map((el) => new ObjectId(el.owner));
            let users = await this.usersDb.findWithIds(owners_id);

            data.forEach((project) => {
                let owner = users.find((user) => user._id.equals(project.owner));
                if (owner) project.owner = this.format.fromObject(owner, PublicUserDto);
            });

            return this.format.fromArray(data, PublicTasksDto);  
        } catch (error) {
            throw error;
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
    async createTask(@Param() params, @Body() body: CreateTasksDto, @Headers() headers): Promise<DetailsTasksDto> {
        try {
            let project = await this.projectsDb.getById(params.projectId);
            let owner = await this.usersDb.getByToken(headers['x-token']);
            
            let id = await this.tasksDb.insertOne(new ObjectId(project._id), body, owner._id);
            let newTask = await this.tasksDb.getById(new ObjectId(id));
            
            project.tasks.push(newTask._id);
            await this.projectsDb.updateOne(project._id, new EditProjectsDto(project));

            newTask.owner = this.format.fromObject(owner, PublicUserDto);

            return this.format.fromObject(newTask, DetailsTasksDto);
        } catch(error) {
            throw error;
        }
    }
    /***/
}
