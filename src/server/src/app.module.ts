/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 12:07:51                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-01 15:27:05                               *
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
/***/

/* Services */
import { PrismaService } from "./prisma.service";
/***/

@Module({
  imports: [],
  controllers: [
    UsersController
  ],
  providers: [
    PrismaService
  ]
})
export class AppModule {}
