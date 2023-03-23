/******************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:13:59                               *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-22 16:18:59                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
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
  IsArray,
  IsObject,
  IsNumber,
  IsIn
} from "class-validator";
import * as commentsDto from "./comments.dto";
import * as tasksDto from "./tasks.dto";
/***/

/* Dto */
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

  @IsString()
  @IsIn(["new", "done", "reject", "progress", "wait"])
  @IsOptional()
    status: string;

  @IsString()
  @IsOptional()
    targetVersion: string;

  @IsString({each: true})  
  @IsOptional()
    versionList: Array<string>;
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
  @IsIn(["new", "done", "reject", "progress"])
  @IsOptional()
    status: string;

  @IsString()
  @IsOptional()
    version: string;

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
  @IsIn(["new", "done", "reject", "progress"])
    status: string;

  @IsString()
    version: string;

  @IsString()
    created: Date;

  @IsString()
    description: string;

  @IsObject()
    owner: usersDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.version = data.version;
      this.created = data.created;
      this.description = data.description;
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
  @IsIn(["new", "done", "reject", "progress"])
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

  @IsObject()
    owner: usersDto.PublicOutput;

  @IsArray()
    assignments: usersDto.PublicOutput;

  @IsNumber()
    progress: number;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.version = data.version;
      this.created = data.created;
      this.description = data.description;
      this.tasks = data.tasks.map((el) => new tasksDto.PublicOutput(el));
      this.owner = new usersDto.PublicOutput(data.owner);
      this.comments = data.comments.map((el) => new commentsDto.PublicOutput(el),);
      this.assignments = data.assignments.map((el) => {
        return new usersDto.PublicOutput(el.user);
      });

      this.progress =  Math.floor(this.tasks.filter((el) => el.status === "done").length * 100 / this.tasks.length) || 0;
    }
  }
}
/***/

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
