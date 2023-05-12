/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-02-21 14:10:15                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-05-09 17:15:29                               *
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
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log(
    `${new Date().toISOString()} - Server started on port ${process.env.PORT}`,
  );
}
bootstrap();
