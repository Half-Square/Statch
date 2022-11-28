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
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AuthModule } from './modules/auth/auth.module';
/***/

/* Entities */
import { Users } from './modules/users/users.entity';
import { Projects } from './modules/projects/projects.entity';
import { Tasks } from './modules/tasks/tasks.entity';
import { Comments } from './modules/comments/comments.entity';
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
        Tasks,
        Comments
      ]
    }),
    UsersModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [FormatService],
})
export class AppModule {}
