/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-09 12:57:20                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-09 13:04:34                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Upload output
*/

/* Imports */
import { File } from "@prisma/client";
import { IsString } from "class-validator";
/***/

/**
* Upload output 
*/
class UploadOutput {
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
  UploadOutput
};