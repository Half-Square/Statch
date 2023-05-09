/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:06:44                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-14 15:05:28                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import {INestApplication, Injectable, NestMiddleware, OnModuleInit} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import {ContextPrismaClient} from "./context-prisma-client";
/***/

@Injectable()
export class PrismaService extends ContextPrismaClient implements OnModuleInit {
  

  async onModuleInit(): Promise<void> {
    await this.$connect();

    // this.$use(async (params, next) => {
    //   const before = Date.now()
    
    //   const result = await next(params)
    
    //   const after = Date.now()
    
    //   let findTab = [ "findFirst", "findMany", "findRaw",  "findUnique"]
    //   if (!findTab.includes(params.action)) {
    //     console.log("Params: ",JSON.stringify(params))
    //     console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
    //   }
    //   return result
    // })
    
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on("beforeExit", async() => {
      await app.close();
    });
  }
}
