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
    * Modules
*/

/* Nest */
import { Module, forwardRef } from '@nestjs/common';
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

/* Module */
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TasksModule } from '../tasks/tasks.module';
import { CommentsModule } from '../comments/comments.module';
/***/

@Module({
    imports: [
        TypeOrmModule.forFeature([Projects, Users]),
        UsersModule,
        AuthModule,
        forwardRef(() => TasksModule),
        forwardRef(() => CommentsModule)
    ],
    providers: [ProjectsDbService, FormatService],
    controllers: [ProjectsController],
    exports: [ProjectsDbService]
})
export class ProjectsModule {}
