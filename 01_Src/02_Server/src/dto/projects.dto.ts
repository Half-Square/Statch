/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:13:59                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-24 11:27:54                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * UpdateInput
  * PublicOutput
  * DetailsOutput
*/

/* Imports */
import {Comment, Task} from "@prisma/client";
import {
  IsString,
  IsOptional,
  IsArray
} from "class-validator";
import * as commentsDto from "./comments.dto";
import * as tasksDto from "./tasks.dto";
/***/

/**
* CreateInput
*/
class CreateInput {
  @IsString()
    name: string;

  @IsString()
    description: string;

  @IsString()
  @IsOptional()
    status: string;

  @IsString()
  @IsOptional()
    version: string;
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
    version: string;

  @IsString()
  @IsOptional()
    description: string;
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
    version: string;

  @IsString()
    created: Date;

  @IsString()
    description: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.version = data.version;
      this.created = data.created;
      this.description = data.description;
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
    version: string;

  @IsString()
    created: Date;

  @IsString()
    description: string;

  @IsArray()
    comments: Comment[];

  @IsArray()
    tasks: Task[];

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.version = data.version;
      this.created = data.created;
      this.description = data.description;
      this.comments = data.comments.map(
        (el) => new commentsDto.PublicOutput(el),
      );
      this.tasks = data.tasks.map((el) => new tasksDto.PublicOutput(el));
    }
  }
}
/***/

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
