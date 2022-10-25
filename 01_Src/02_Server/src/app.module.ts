/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-15 14:17:51
 * @ Description: Importations file
 */

/* SUMMARY
  * Nest
  * Services
  * Modules
*/

/* Nest */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
/***/

/* Services */
import { FormatService } from './services/format/format.service';
/***/

/* Modules */
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
/***/

/* Entities */
import { Users } from './users/users.entity';
import { Projects } from './projects/projects.entity';
import { Tasks } from './tasks/tasks.entity';
/***/

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: 'root',
      password: '',
      database: 'test',
      entities: [
        Users,
        Projects,
        Tasks
      ]
    }),
    UsersModule,
    ProjectsModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [FormatService],
})
export class AppModule {}
