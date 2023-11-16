/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-11-16 15:56:57                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-11-16 16:45:15                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Upload database 
  * Download database dump
*/

/* Imports */
import { Controller, UseGuards, Get, StreamableFile, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream, readdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { IsAdminGuard } from "src/guards/is-admin.guard";
/***/

@Controller("api/database")
export class DatabaseController {
  /*
    @UseInterceptors(FileInterceptor("file"))
  async upload(
    @UploadedFile() file: Express.Multer.File
  */

  /**
  * Upload database 
  */
  @Post("upload")
  @UseGuards(IsAdminGuard)
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file: Express.Multer.File): {message: string} {
    const files = readdirSync(resolve("prisma/databases"));
    const filename = files.find((el) => el.includes(".db"));
    
    writeFileSync(resolve(`prisma/databases/${filename}`), file.buffer);

    return {message: "Hello world"};
  }
  /***/

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
