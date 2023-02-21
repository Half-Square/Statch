/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:10:15                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-21 14:10:31                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";
import {AppModule} from "./app.module";
/***/

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  await app.listen(process.env.PORT);
  console.log(
    `${new Date().toISOString()} - Server started on port ${process.env.PORT}`,
  );
}
bootstrap();
