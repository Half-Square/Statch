/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-09 12:57:20                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-09 15:24:47                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Files output
*/

/* Imports */
import { File } from "@prisma/client";
import { IsString } from "class-validator";
/***/

/**
* Files output 
*/
class FilesOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    path: string;

  @IsString()
    date: Date;

  constructor(data: File) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.path = data.path;
      this.date = data.date;
    }
  }
}
/***/

export {
  FilesOutput
};