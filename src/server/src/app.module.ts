/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 12:07:51                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-24 13:55:04                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Controllers
  * Services
*/

/* Imports */
import { Module } from "@nestjs/common";
/***/

/* Controllers */
import { UsersController } from "./users/users.controller";
import { ProjectsController } from "./projects/projects.controller";
/***/

/* Services */
import { PrismaService } from "./prisma.service";
import { SocketService } from "./services/socket/socket.service";
import { TasksController } from "./tasks/tasks.controller";
/***/

@Module({
  imports: [],
  controllers: [
    UsersController,
    ProjectsController,
    TasksController
  ],
  providers: [
    PrismaService,
    SocketService
  ]
})
export class AppModule {}
