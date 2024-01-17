/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-16 15:56:57                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 11:50:53                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Upload database 
  * Download database dump
*/

/* Imports */
import { Controller, UseGuards, Get, StreamableFile, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { SetMetadata } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream, readdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { IsAdminGuard } from "src/guards/is-admin.guard";
import { IsPermissionsGuard } from "src/guards/is-perms.guard";
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
  @UseGuards(IsAdminGuard, IsPermissionsGuard)
  @UseInterceptors(FileInterceptor("file"))
  @SetMetadata("permissions", [{type: "database", actions: ["import"]}])
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
  @UseGuards(IsAdminGuard, IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "database", actions: ["export"]}])
  dump(): StreamableFile {
    const files = readdirSync(resolve("prisma/databases"));
    const filename = files.find((el) => el.includes(".db"));
    return new StreamableFile(createReadStream(resolve(`prisma/databases/${filename}`)));
  }
  /***/
}
