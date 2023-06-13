/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 12:07:51                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-13 17:22:28                               *
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
/***/

@Module({
  imports: [],
  controllers: [
    UsersController,
    ProjectsController
  ],
  providers: [
    PrismaService
  ]
})
export class AppModule {}
