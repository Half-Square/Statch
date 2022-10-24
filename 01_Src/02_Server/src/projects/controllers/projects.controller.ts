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
    Put
} from '@nestjs/common';
/***/

/* DTO */
import { PublicProjectsDto } from '../dto/public-projects.dto';
import { DetailsProjectsDto } from '../dto/details-projects.dto';
import { CreateProjectsDto } from '../dto/create-projects';
import { EditProjectsDto } from '../dto/edit-projects.dto';
/***/

/* Services */
import { ProjectsDbService } from '../services/projects-db.service';
/***/

@Controller('projects')
export class ProjectsController {
    constructor(private projectsDb: ProjectsDbService) {
    }

    /*
    * Name: getAll
    * Description: Get all projects collection
    * 
    * Return (PublicProjectsDto[]): List of all projects
    */
    @Get()
    async getAll(): Promise<PublicProjectsDto[]> {
        let projects = await this.projectsDb.findAll();
        let ret = [];

        projects.forEach((el) => {
            ret.push(new PublicProjectsDto(el));
        });
        
        return ret;
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
        return await this.projectsDb.findById(params.id);
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
            let ret = await this.projectsDb.findById(id);
            
            if (!id || !ret) throw 'An error occured';
            return new PublicProjectsDto(ret);
        } catch (err) {
            console.error(err);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /***/

    /*
    * Name: editProject
    * Description: Edit one project by ID
    *
    * Params:
    * - id (String): Id of project to modify
    * 
    * Body:
    * - assignees (Users[]):
    */
    @Put('/:id')
    async editProject(@Param() params: any, @Body() body: EditProjectsDto): Promise<DetailsProjectsDto> {
        try {
            // save change
            // get updated
            // get assignees info
            return new DetailsProjectsDto(); // temp
        } catch(err) {
            console.error(err);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /***/
}
