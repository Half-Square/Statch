/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:11:59                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-28 10:39:41                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * DetailsOutput
  * PublicOutput
*/

/* Imports */
import {IsObject, IsString} from "class-validator";
/***/

/* Dto */
import * as usersDto from "../dto/users.dto";
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

  @IsObject()
    author: usersDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.content = data.content;
      this.author = new usersDto.PublicOutput(data.author);
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

  @IsObject()
    author: usersDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.content = data.content;
      this.author = new usersDto.PublicOutput(data.author);
    }
  }
}
/***/

export {CreateInput, PublicOutput, DetailsOutput};
