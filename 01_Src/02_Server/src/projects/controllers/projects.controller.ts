/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-18 14:15:07
 * @ Description: Manage API endpoint for projects collection
 */

/* SUMMARY
    * Nest
    * DTO
    * Services
*/

/* Nest */
import { Controller, Get } from '@nestjs/common';
/***/

/* DTO */
import { PublicProjectsDto } from '../dto/public-projects.dto';
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
}
