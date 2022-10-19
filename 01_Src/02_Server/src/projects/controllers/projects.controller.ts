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
    * Name: addOne
*/

/* Nest */
import { Controller, Get, Post, Body } from '@nestjs/common';
/***/

/* DTO */
import { PublicProjectsDto } from '../dto/public-projects.dto';
import { CreateProjectsDto } from '../dto/create-projects';
/***/

/* Services */
import { ProjectsDbService } from '../services/projects-db.service';
/***/

@Controller('projects')
export class ProjectsController {
    constructor(private projects: ProjectsDbService) {
    }

    /*
    * Name: getAll
    * Description: Get all projects collection
    * 
    * Return (PublicProjectsDto[]): List of all projects
    */
    @Get()
    async getAll(): Promise<PublicProjectsDto[]> {
        let projects = await this.projects.findAll();
        let ret = [];

        projects.forEach((el) => {
            ret.push(new PublicProjectsDto(el));
        });
        
        return ret;
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
    */
    @Post()
    async addOne(@Body() body: CreateProjectsDto): Promise<PublicProjectsDto> {
        let ret = await this.projects.insertOne(body);
        return new PublicProjectsDto(ret);
    }
    /***/
}
