/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:06:44                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 19:33:43                               *
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
