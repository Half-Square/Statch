/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 12:07:51                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-24 17:38:23                               *
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
import { UsersController } from "./controllers/users/users.controller";
import { ProjectsController } from "./controllers/projects/projects.controller";
import { TasksController } from "./controllers/tasks/tasks.controller";
import { TicketsController } from "./controllers/tickets/tickets.controller";
import { CommentsController } from "./controllers/comments/comments.controller";
import { AssignmentsController } from "./controllers/assignments/assignments.controller";
/***/

/* Services */
import { PrismaService } from "./prisma.service";
import { SocketService } from "./services/socket/socket.service";
import { LabelsController } from "./controllers/labels/labels.controller";
import { VersionsController } from "./controllers/versions/versions.controller";
/***/

@Module({
  imports: [],
  controllers: [
    UsersController,
    ProjectsController,
    TasksController,
    TicketsController,
    CommentsController,
    AssignmentsController,
    LabelsController,
    VersionsController
  ],
  providers: [
    PrismaService,
    SocketService
  ]
})
export class AppModule {}
