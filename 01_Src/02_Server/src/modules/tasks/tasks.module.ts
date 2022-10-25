/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 10:05:10
 * @ Description: Manage tasks database and requests
 */

/* SUMMARY
    * Nest
    * Controllers
    * Services
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
import { TasksDbService } from './services/tasks-db.service';
/***/

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks])
  ],
  controllers: [TasksController],
  providers: [TasksDbService]
})
export class TasksModule {
}
