/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-05-30 12:09:38                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-19 14:40:17                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
/***/

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);

  try {
    const defaultRole = await prismaService.role.findFirst({ where: { name: "default" } });

    if(!defaultRole) {
      await prismaService.role.create({
        data: {
          name: "default",
          default: true,
          permissions: JSON.stringify([{
            projects: {
              create: false,
              update: {
                view: true,
                assignee: false,
                version: false,
                status: false,
                labels: false,
                level: false,
                title: false,
                description: false
              },
              view: true,
              delete: false,
              assignSelf: true,
              comment: {
                view: true,
                create: true,
                delete: false,
                update: false,
                updateSelf: false
              }
            },
            tasks: {
              create: false,
              update: {
                view: true,
                assignee: false,
                version: false,
                status: false,
                labels: false,
                level: false,
                title: false,
                description: false
              },
              view: true,
              delete: false,
              assignSelf: true,
              comment: {
                view: true,
                create: true,
                delete: false,
                update: false,
                updateSelf: false
              }
            },
            tickets: {
              create: false,
              update: {
                view: true,
                assignee: false,
                version: false,
                status: false,
                labels: false,
                level: false,
                title: false,
                description: false
              },
              view: true,
              delete: false,
              assignSelf: true,
              comment: {
                view: true,
                create: false,
                delete: false,
                update: false,
                updateSelf: false
              }
            },
            versions: {
              view: true,
              create: false
            },
            labels: {
              create: false,
              view: true,
              update: {
                view: true,
                name: false,
                description: false
              },
              delete: false
            },
            smtp: {
              update: false,
              view: false
            },
            users: {
              view: false,
              update: false
            },
            database: {
              view: false,
              import: false,
              export: false
            },
            permissions: {
              view: false,
              create: false,
              update: false,
              delete: false
            },
            profile: {
              view: true,
              update: {
                view: true,
                name: true,
                email: false,
                picture: false
              }
            }
          }])
        }
      });
    }
  } catch (err) {
    console.error("Error: Default role cant create");
  } finally {
    await prismaService.$disconnect();
  }

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.enableCors();

  await app.listen(Number(process.env.PORT)); // Start API server
  Logger.log(`Server start on port ${process.env.PORT}`);
}
bootstrap();
