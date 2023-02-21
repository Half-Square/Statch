/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:11:59                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-21 14:13:51                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * DetailsOutput
  * PublicOutput
*/

/* Imports */
import {IsString} from "class-validator";
import {Comment} from "@prisma/client";
/***/

/**
* CreateInput 
*/
class CreateInput {
  @IsString()
    content: string;
}
/***/

/**
* DetailsOutput
*/
class DetailsOutput {
  @IsString()
    id: string;

  @IsString()
    created: Date;

  @IsString()
    content: string;

  constructor(data: Comment) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.content = data.content;
    }
  }
}
/***/

/**
* PublicOutput 
*/
class PublicOutput {
  @IsString()
    id: string;

  @IsString()
    created: Date;

  @IsString()
    content: string;

  constructor(data: Comment) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.content = data.content;
    }
  }
}
/***/

export {CreateInput, PublicOutput, DetailsOutput};
