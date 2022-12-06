/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-18 14:15:07
 * @ Description: Manage API endpoint for projects collection
 */

/* SUMMARY
    * Nest
    * DTO
    * Services
    * Name: getAll
    * Name: getById
    * Name: addOne
    * Name: updateProject
*/

/* Nest */
import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Put,
    UseGuards,
    Headers
} from '@nestjs/common';

import { ObjectId } from 'mongodb';
/***/

/* DTO */
import { PublicProjectsDto } from '../dto/public-projects.dto';
import { DetailsProjectsDto } from '../dto/details-projects.dto';
import { CreateProjectsDto } from '../dto/create-projects.dto';
import { EditProjectsDto } from '../dto/edit-projects.dto';
import { PublicTasksDto } from 'src/modules/tasks/dto/public-tasks.dto';
import { PublicCommentsDto } from 'src/modules/comments/dto/public-comments.dto';
/***/

/* Services */
import { FormatService } from '../../../services/format/format.service';
import { ProjectsDbService } from '../services/projects-db.service';
import { UsersDbService } from 'src/modules/users/services/users-db.service';
import { PublicUserDto } from 'src/modules/users/dto/public-user.dto';
import { TasksDbService } from 'src/modules/tasks/services/tasks-db.service';
import { CommentsDbService } from 'src/modules/comments/services/comments-db.service';
/***/

/* Guards */
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
/***/

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
    constructor(private projectsDb: ProjectsDbService,
                private usersDb: UsersDbService,
                private tasksDb: TasksDbService,
                private commentsDb: CommentsDbService,
                private format: FormatService) {
    }

    /*
    * Name: getAll
    * Description: Get all projects collection
    * 
    * Return (PublicProjectsDto[]): List of all projects
    */
    @Get()
    async getAll(): Promise<PublicProjectsDto[]> {
        try {
            let projects = await this.projectsDb.getAll();
            let owners_id = projects.map((el) => new ObjectId(el.owner));
            let users = await this.usersDb.findWithIds(owners_id);

            projects.forEach((project) => {
                let owner = users.find((user) => user._id.equals(project.owner));
                if (owner) project.owner = this.format.fromObject(owner, PublicUserDto);
            });

            let ret = this.format.fromArray(projects, PublicProjectsDto);

            return ret;
        } catch (error) {
            throw error;
        }
    }
    /***/

    /*
    * Name: getById
    * Description: Get complete projects informations by id
    * 
    * Params:
    * - id (String): Projects id
    * 
    * Return (DetailsProjectsDto): Complete informations of project
    */
    @Get('/:id')
    async getById(@Param() params): Promise<DetailsProjectsDto> {
        try {
            let project = await this.projectsDb.getById(params.id);
            let users = await this.usersDb.findWithIds(project.assignees);
            let owner = await this.usersDb.getById(new ObjectId(project.owner));
            let tasks = await this.tasksDb.findWithIds(project.tasks);
            let comments = await this.commentsDb.findWithIds(project.comments);

            project.tasks = this.format.fromArray(tasks, PublicTasksDto);
            project.comments = this.format.fromArray(comments, PublicCommentsDto);

            project.assignees = this.format.fromArray(users, PublicUserDto); // Agglomerate data in project
            project.owner = this.format.fromObject(owner, PublicUserDto);
            return this.format.fromObject(project, DetailsProjectsDto);
        } catch (error) {
            throw error;
        }
    }
    /***/

    /*
    * Name: addOne
    * Description: Create project
    * 
    * Body:
    * - name (String): Project name
    * - version (String): Project version
    * - description (String): Project version
    * 
    * Return (PublicProjectsDto): Created item
    */
    @Post()
    async addOne(@Headers() headers, @Body() body: CreateProjectsDto): Promise<PublicProjectsDto> {
        try {
            let user = await this.usersDb.getByToken(headers['x-token']);
            let id = await this.projectsDb.insertOne(body, user);
            let ret = await this.projectsDb.getById(new ObjectId(id));
            
            ret.owner = this.format.fromObject(user, PublicUserDto);
            return this.format.fromObject(ret, PublicProjectsDto);
        } catch (err) {
            throw err;
        }
    }
    /***/

    /*
    * Name: updateProject
    * Description: Update one project by ID
    *
    * Params:
    * - id (String): Id of project to modify
    * 
    * Body (EditProjectDto):
    * - name (String): Project name
    * - status (string): Project status
    * - version (string): Project version
    * - description (string): Project description
    * - assignees (ObjectID[]): Users affected to the project
    * 
    * Return (DetailsProjectsDto): Project updated
    */
    @Put('/:id')
    async updateProject(@Param() params: any, @Body() body: EditProjectsDto): Promise<DetailsProjectsDto> {
        try {
            let users = await this.usersDb.findWithIds(body.assignees ? body.assignees.map((el) => el._id) : []); // Get assigned users
            body.assignees = users;

            await this.projectsDb.updateOne(new ObjectId(params.id), body); // Update project
            let project = await this.projectsDb.getById(params.id);

            this.usersDb.addSubscriptionsToMany(users, params.id, "projects"); // Update users subscription

            project.owner = this.format.fromObject(await this.usersDb.getById(new ObjectId(project.owner)), PublicUserDto); // Agglomerate owner data
            project.assignees = this.format.fromArray(users, PublicUserDto); // Agglomerate data in project

            return this.format.fromObject(project, DetailsProjectsDto);
        } catch(err) {
            throw err;
        }
    }
    /***/
}
