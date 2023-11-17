/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-05-09 12:30:43                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-17 13:31:28                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Dto
  * Guards
  * Get all saved file
  * Get raw file
  * Get one file by id
  * Upload files
  * Delete file by id
*/

/* Imports */
import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  UseGuards,
  StreamableFile
} from "@nestjs/common";
import * as fs from "fs";
import { FileInterceptor } from "@nestjs/platform-express";
import { sha256 } from "js-sha256";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
/***/

/* Dto */
import * as filesDto from "./files.dto";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
import { join, resolve } from "path";
/***/

@Controller("api/files")
@UseGuards(IsConnectedGuard)
export class FilesController {
  constructor(private prisma: PrismaService) {
  }

  /*
  * Get all saved file
  */
  @Get()
  async getFiles(): Promise<filesDto.FilesOutput[]> {
    try {
      const ret = await this.prisma.file.findMany();
      return ret.map((el) => new filesDto.FilesOutput(el));
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Get raw file
  * @param filename - File to get
  */
  @Get("raw/:filename")
  async getRawFile(@Param("filename") filename: string): Promise<StreamableFile> {
    const file = fs.createReadStream(join(resolve("upload"), filename));
    return new StreamableFile(file);
  }
  /***/

  /**
  * Get one file by id
  * @param id - File's id to get
  */
  @Get(":id")
  async getFile(@Param("id") id: string): Promise<filesDto.FilesOutput> {
    try {
      const ret = await this.prisma.file.findUnique({where: {id: id}});
      
      if (ret) return new filesDto.FilesOutput(ret);
      else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Upload files
  * @param file - Uploaded file
  */
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @UploadedFile() file: Express.Multer.File
  ): Promise<filesDto.FilesOutput> {
    try {
      const hash = sha256(file.originalname + Date.now()).substring(0, 8);
      fs.writeFileSync(`${resolve("upload")}/${hash}-${file.originalname}`, file.buffer);

      const ret = await this.prisma.file.create({
        data: {
          name: file.originalname,
          path: `${hash}-${file.originalname}`
        }
      });

      return new filesDto.FilesOutput(ret);
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Delete file by id
  * @param id - File's id to remove 
  */
  @Delete(":id")
  async deleteFile(@Param("id") id: string): Promise<void> {
    try {
      const ret = await this.prisma.file.findUnique({where: {id: id}});

      if (!ret) throw new HttpException("File not found", HttpStatus.NOT_FOUND);
      else {
        fs.unlinkSync(resolve("upload")+"/"+ret.path);
        await this.prisma.file.delete({where: {id: id}});
        return;
      }
    } catch (err) {
      throw err;
    }
  }
  /***/
}
