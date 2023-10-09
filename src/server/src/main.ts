/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 12:09:38                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-09 10:35:32                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import * as fs from "fs";
import { resolve } from "path";
/***/

async function bootstrap(): Promise<void> {
  const httpsOptions = process.env.PROD === "true" ? {
    key: fs.readFileSync(resolve("certs/privkey.pem")),
    cert: fs.readFileSync(resolve("certs/cert.pem"))
  } : undefined;

  const app = await NestFactory.create(AppModule, {httpsOptions});
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.enableCors();

  await app.listen(Number(process.env.PORT)); // Start API server
  Logger.log(`Server start on port ${process.env.PORT}`);
}
bootstrap();
