/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-11-16 15:56:57                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-11-16 16:05:35                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Download database dump
*/

/* Imports */
import { Controller, UseGuards, Get, StreamableFile } from "@nestjs/common";
import { createReadStream, readdirSync } from "fs";
import { resolve } from "path";
import { IsAdminGuard } from "src/guards/is-admin.guard";
/***/

@Controller("api/database")
export class DatabaseController {
  /**
  * Download database dump 
  */
  @Get("dump")
  @UseGuards(IsAdminGuard)
  dump(): StreamableFile {
    const files = readdirSync(resolve("prisma/databases"));
    const filename = files.find((el) => el.includes(".db"));
    return new StreamableFile(createReadStream(resolve(`prisma/databases/${filename}`)));
  }
  /***/
}
