/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-09 12:30:43                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-09 13:00:34                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Upload files
*/

/* Imports */
import { Controller, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import * as fs from "fs";
import { FileInterceptor } from "@nestjs/platform-express";
import { sha256 } from "js-sha256";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
/***/

/* Dto */
import * as uploadDto from "../../dto/upload.dto";
/***/

@Controller("api/upload")
export class UploadController {
  constructor(private prisma: PrismaService) {
  }

  /**
  * Upload files 
  */
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async upload0(
    @UploadedFile() file: Express.Multer.File
  ): Promise<uploadDto.UploadOutput> {
    try {
      const hash = sha256(file.originalname + Date.now()).substring(0, 8);
      fs.writeFileSync(`./upload/${hash}-${file.originalname}`, file.buffer);

      const ret = await this.prisma.file.create({
        data: {
          name: file.originalname,
          path: `upload/${hash}-${file.originalname}`
        }
      });

      return new uploadDto.UploadOutput(ret);
    } catch (err) {
      throw err;
    }
  }
  /***/
}
