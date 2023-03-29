/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:10:37                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-29 15:46:01                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {PrismaService} from "./prisma.service";
import {ProjectsController} from "./controllers/projects/projects.controller";
import {TasksController} from "./controllers/tasks/tasks.controller";
import {CommentsController} from "./controllers/comments/comments.controller";
import {TicketsController} from "./controllers/tickets/tickets.controller";
import { AuthController } from "./controllers/auth/auth.controller";
import { VersionsController } from './controllers/versions/versions.controller';
import { SearchController } from './controllers/search/search.controller';
import { SearchFilterService } from './controllers/search/services/search-filter/search-filter.service';
import { AssignmentsController } from './controllers/assignments/assignments.controller';
/***/

@Module({
  imports: [],
  controllers: [
    AppController,
    ProjectsController,
    TasksController,
    CommentsController,
    TicketsController,
    AuthController,
    VersionsController,
    SearchController,
    AssignmentsController
  ],
  providers: [PrismaService, SearchFilterService]
})
export class AppModule {}
