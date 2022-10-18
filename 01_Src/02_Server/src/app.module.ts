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
import { AppService } from './app.service';
/***/

/* Modules */
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
/***/

/* Entities */
import { Users } from './users/users.entity';
import { Projects } from './projects/projects.entity';
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
        Projects
      ]
    }),
    UsersModule,
    ProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
