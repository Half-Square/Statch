/******************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:10:37                               *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-28 11:11:19                               *
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
    SearchController
  ],
  providers: [PrismaService, SearchFilterService]
})
export class AppModule {}
