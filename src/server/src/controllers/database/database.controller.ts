/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-11-16 15:56:57                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2024-01-31 17:10:04                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Upload database 
  * Download database dump
*/

/* Imports */
import {
  Controller,
  UseGuards,
  Get,
  StreamableFile,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream, createWriteStream, readdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import * as archiver from "archiver";
import * as extract from "extract-zip";
/***/

/* Guards */
import { IsAdminGuard } from "src/guards/is-admin.guard";
import { IsConnectedGuard } from "src/guards/is-connected.guard";
/***/

@Controller("api/database")
export class DatabaseController {
  /**
  * Upload database 
  */
  @Post("upload")
  @UseGuards(IsAdminGuard, IsConnectedGuard)
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file: Express.Multer.File): {message: string} {
    const files = readdirSync(resolve("prisma/databases"));
    const filename = files.find((el) => el.includes(".db"));
    
    writeFileSync(resolve(`prisma/databases/${filename}`), file.buffer);

    return {message: "Database uploaded !"};
  }
  /***/

  /**
  * Upload database 
  */
  @Post("upload/img")
  @UseGuards(IsAdminGuard)
  @UseInterceptors(FileInterceptor("file"))
  async uploadImg(@UploadedFile() file: Express.Multer.File): Promise<{message: string}> {
    writeFileSync(resolve("upload/images.zip"), file.buffer);

    try {
      await extract(resolve("upload/images.zip"), {dir: resolve("upload")});
    } catch (error) {
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {message: "Images uploaded !"};
  }
  /***/

  /**
  * Download database dump 
  */
  @Get("dump")
  @UseGuards(IsAdminGuard, IsConnectedGuard)
  dump(): StreamableFile {
    const files = readdirSync(resolve("prisma/databases"));
    const filename = files.find((el) => el.includes(".db"));
    return new StreamableFile(createReadStream(resolve(`prisma/databases/${filename}`)));
  }
  /***/

  /**
  * Download images archives 
  */
  @Get("dump/img")
  @UseGuards(IsAdminGuard, IsConnectedGuard)
  async dumpImg(): Promise<StreamableFile> {
    const zipFile: Promise<void> = new Promise((r, reject) => {
      const output = createWriteStream(resolve("upload/images.zip"));
      const archive = archiver("zip", {zlib: {level: 9}});
      
      output.on("close", () => {
        return r();
      });
      
      output.on("error", () => {
        return reject();
      });
      
      archive.pipe(output);

      const files = readdirSync(resolve("upload"));
      files.forEach((file) => {
        if (!file.match(/(.*\.zip)|(\.gitkeep)/g)) {
          archive.append(createReadStream(resolve(`upload/${file}`)), {name: file});
        }
      });

      archive.finalize();
    });
    
    await zipFile.then().catch(() => {
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    });
  
    return new StreamableFile(createReadStream(resolve(`upload/images.zip`)));
  }
  /***/
}
