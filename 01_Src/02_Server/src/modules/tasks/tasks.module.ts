/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 10:05:10
 * @ Description: Manage tasks database and requests
 */

/* SUMMARY
    * Nest
    * Controllers
    * Services
    * Modules
*/

/* Nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/***/

/* Entities */
import { Tasks } from './tasks.entity';
/***/

/* Controllers */
import { TasksController } from './controllers/tasks.controller';
/***/

/* Services */
import { FormatService } from 'src/services/format/format.service';
import { TasksDbService } from './services/tasks-db.service';
/***/

/* Modules */
import { ProjectsModule } from '../projects/projects.module';
/***/

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks]),
    ProjectsModule
],
  controllers: [TasksController],
  providers: [TasksDbService, FormatService]
})
export class TasksModule {
}
