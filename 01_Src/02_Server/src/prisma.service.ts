/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:06:44                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-21 14:10:05                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import {INestApplication, Injectable, OnModuleInit} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";
/***/

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on("beforeExit", async() => {
      await app.close();
    });
  }
}
