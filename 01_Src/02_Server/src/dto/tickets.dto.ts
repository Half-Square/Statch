/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:18:25                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-27 11:49:18                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * UpdateInput
  * PublicOutput
  * DetailsOutput
*/

/* Imports */
import {IsArray, IsOptional, IsString} from "class-validator";
/***/

/* Dto */
import * as commentsDto from "../dto/comments.dto";
/***/

/**
* CreateInput 
*/
class CreateInput {
  @IsString()
    name: string;
}
/***/

/**
* UpdateInput 
*/
class UpdateInput {
  @IsString()
  @IsOptional()
    name: string;

  @IsString()
  @IsOptional()
    status: string;
}
/***/

/**
* PublicOutput 
*/
class PublicOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    status: string;

  @IsString()
    taskId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.taskId = data.taskId;
    }
  }
}
/***/

/**
* DetailsOutput
*/
class DetailsOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    status: string;

  @IsString()
    taskId: string;

  @IsArray()
    comments: Comment[];

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.taskId = data.taskId;

      if (data.comments) {
        this.comments = data.comments.map((el) => new commentsDto.PublicOutput(el));
      }
    }
  }
}
/***/

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
