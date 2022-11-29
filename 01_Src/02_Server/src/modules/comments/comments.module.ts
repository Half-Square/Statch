/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-04 09:48:46
 * @ Description: Manage comments features
 */

/* SUMMARY
    * Nest
    * Controllers
    * Services
    * Entities
    * Modules
*/

/* Nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/***/

/* Controllers */
import { CommentsController } from './controllers/comments.controller';
/***/

/* Services */
import { FormatService } from 'src/services/format/format.service';
import { ProjectsDbService } from '../projects/services/projects-db.service';
import { TasksDbService } from '../tasks/services/tasks-db.service';
import { UsersDbService } from '../users/services/users-db.service';
import { CommentsDbService } from './services/comments-db.service';
/***/

/* Entities */
import { Comments } from './comments.entity';
import { Projects } from '../projects/projects.entity';
import { Tasks } from '../tasks/tasks.entity';
/***/

/* Modules */
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
/***/

@Module({
    imports: [
        TypeOrmModule.forFeature([Comments, Projects, Tasks]),
        UsersModule,
        AuthModule
    ],
    controllers: [CommentsController],
        providers: [FormatService, ProjectsDbService, TasksDbService, CommentsDbService]
})
export class CommentsModule {}
