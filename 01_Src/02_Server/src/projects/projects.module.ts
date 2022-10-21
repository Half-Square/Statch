/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 14:35:24
 * @ Description: Manage projects database and requests
 */

/* SUMMARY
    * Nest
    * Entities
    * Controllers
    * Services
*/

/* Nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/***/

/* Entities */
import { Projects } from './projects.entity';
import { Users } from '../users/users.entity';
/***/

/* Controllers */
import { ProjectsController } from './controllers/projects.controller';
/***/

/* Services */
import { ProjectsDbService } from './services/projects-db.service';
/***/

@Module({
    imports: [
        TypeOrmModule.forFeature([Projects, Users])
    ],
    providers: [ProjectsDbService],
    controllers: [ProjectsController]
})
export class ProjectsModule {}
