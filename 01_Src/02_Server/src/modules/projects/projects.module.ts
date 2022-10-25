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
import { FormatService } from 'src/services/format/format.service';
import { ProjectsDbService } from './services/projects-db.service';
/***/

@Module({
    imports: [
        TypeOrmModule.forFeature([Projects, Users])
    ],
    providers: [ProjectsDbService, FormatService],
    controllers: [ProjectsController],
    exports: [ProjectsDbService]
})
export class ProjectsModule {}
