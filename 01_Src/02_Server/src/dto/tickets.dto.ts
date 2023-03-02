/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:18:25                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-03-02 15:10:55                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * UpdateInput
  * PublicOutput
  * DetailsOutput
*/

/* Imports */
import {IsArray, IsObject, IsOptional, IsString} from "class-validator";
/***/

/* Dto */
import * as commentsDto from "../dto/comments.dto";
import * as usersDto from "../dto/users.dto";
/***/

/**
* CreateInput 
*/
class CreateInput {
  @IsString()
    name: string;

  @IsString()
    description: string;
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

  @IsString()
  @IsOptional()
    description: string;

  @IsArray()
    assignments: usersDto.PublicOutput[];
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
    description: string;

  @IsString()
    status: string;

  @IsString()
    taskId: string;

  @IsObject()
    owner: usersDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.status = data.status;
      this.taskId = data.taskId;
      this.owner = new usersDto.PublicOutput(data.owner);
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
    description: string;

  @IsString()
    status: string;

  @IsString()
    taskId: string;

  @IsArray()
    comments: Comment[];

  @IsObject()
    owner: usersDto.PublicOutput;

  @IsArray()
    assignments: usersDto.PublicOutput[];

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.status = data.status;
      this.taskId = data.taskId;
      this.owner = new usersDto.PublicOutput(data.owner);
      this.assignments = data.assignments.map((el) => {
        return new usersDto.PublicOutput(el.user);
      });

      if (data.comments) {
        this.comments = data.comments.map((el) => new commentsDto.PublicOutput(el));
      }
    }
  }
}
/***/

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
