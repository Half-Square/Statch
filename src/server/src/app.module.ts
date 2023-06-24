/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 12:07:51                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-24 17:12:04                               *
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
import { TasksController } from "./tasks/tasks.controller";
import { TicketsController } from "./tickets/tickets.controller";
import { CommentsController } from "./comments/comments.controller";
/***/

/* Services */
import { PrismaService } from "./prisma.service";
import { SocketService } from "./services/socket/socket.service";
/***/

@Module({
  imports: [],
  controllers: [
    UsersController,
    ProjectsController,
    TasksController,
    TicketsController,
    CommentsController
  ],
  providers: [
    PrismaService,
    SocketService
  ]
})
export class AppModule {}
