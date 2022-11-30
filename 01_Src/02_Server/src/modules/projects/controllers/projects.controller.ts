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
    HttpStatus,
    HttpException,
    Get,
    Post,
    Param,
    Body,
    Put,
    UseGuards
} from '@nestjs/common';

import { ObjectId } from 'mongodb';
/***/

/* DTO */
import { PublicProjectsDto } from '../dto/public-projects.dto';
import { DetailsProjectsDto } from '../dto/details-projects.dto';
import { CreateProjectsDto } from '../dto/create-projects';
import { EditProjectsDto } from '../dto/edit-projects.dto';
/***/

/* Services */
import { FormatService } from '../../../services/format/format.service';
import { ProjectsDbService } from '../services/projects-db.service';
import { UsersDbService } from 'src/modules/users/services/users-db.service';
import { PublicUserDto } from 'src/modules/users/dto/public-user.dto';
/***/

/* Guards */
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
/***/

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
    constructor(private projectsDb: ProjectsDbService,
                private usersDb: UsersDbService,
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

            project.assignees = this.format.fromArray(users, PublicUserDto); // Agglomerate data in project
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
    async addOne(@Body() body: CreateProjectsDto): Promise<PublicProjectsDto> {
        try {
            let id = await this.projectsDb.insertOne(body);
            let ret = await this.projectsDb.getById(new ObjectId(id));
            
            // Set and agglomerate owner

            return this.format.fromObject(ret, PublicProjectsDto);
        } catch (err) {
            console.error(err);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
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

            project.assignees = this.format.fromArray(users, PublicUserDto); // Agglomerate data in project

            return this.format.fromObject(project, DetailsProjectsDto);
        } catch(err) {
            console.error(err);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /***/
}
