/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 12:07:51                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-05 20:43:35                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
* Controllers
* Services
*/

/* Imports */
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { resolve } from "path";
/***/

/* Controllers */
import { UsersController } from "./controllers/users/users.controller";
import { ProjectsController } from "./controllers/projects/projects.controller";
import { TasksController } from "./controllers/tasks/tasks.controller";
import { TicketsController } from "./controllers/tickets/tickets.controller";
import { CommentsController } from "./controllers/comments/comments.controller";
import { AssignmentsController } from "./controllers/assignments/assignments.controller";
import { LabelsController } from "./controllers/labels/labels.controller";
import { VersionsController } from "./controllers/versions/versions.controller";
import { SettingsController } from "./controllers/settings/settings.controller";
import { ActivitiesController } from "./controllers/activities/activities.controller";
import { SearchController } from "./controllers/search/search.controller";
/***/

/* Services */
import { PrismaService } from "./prisma.service";
import { SocketService } from "./services/socket/socket.service";
import { ActivitiesService } from "./controllers/activities/activities.service";
import { FilesController } from "./controllers/files/files.controller";
/***/

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve("client")
    })
  ],
  controllers: [
    UsersController,
    ProjectsController,
    TasksController,
    TicketsController,
    CommentsController,
    AssignmentsController,
    LabelsController,
    VersionsController,
    SettingsController,
    ActivitiesController,
    FilesController,
    SearchController
  ],
  providers: [
    PrismaService,
    SocketService,
    ActivitiesService
  ]
})
export class AppModule {}
