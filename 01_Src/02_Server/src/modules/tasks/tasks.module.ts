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
import { Module, forwardRef } from '@nestjs/common';
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
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
/***/

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks]),
    forwardRef(() => ProjectsModule),
    UsersModule,
    AuthModule
],
  controllers: [TasksController],
  providers: [TasksDbService, FormatService],
  exports: [TasksDbService]
})
export class TasksModule {
}
