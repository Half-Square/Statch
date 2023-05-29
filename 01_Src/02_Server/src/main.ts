/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:10:15                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-22 13:59:09                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Init system settings, default settings tables
*/

/* Imports */
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";
import {AppModule} from "./app.module";
import { PrismaService } from "./prisma.service";
import * as jwt from "jsonwebtoken";
/***/

/*
* Init system settings, default settings tables
*/
async function initSystemSettings(): Promise<void> {
  let prisma = new PrismaService();
  let settings = await prisma.system.findFirst();

  if (!settings) {
    await prisma.system.create({
      data: {
        smtp: {
          create: {
            host: "stmp.server.com",
            port: 584,
            user: "user",
            password: jwt.sign("password", process.env.SALT)
          }
        }
      }
    });

    console.log(
      `${new Date().toISOString()} - Default settings setup`,
    );
  }
}
/***/

async function bootstrap(): Promise<void> {
  await initSystemSettings();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.enableCors();
  await app.listen(process.env.PORT);
  
  console.log(
    `${new Date().toISOString()} - Server started on port ${process.env.PORT}`,
  );
}
bootstrap();
