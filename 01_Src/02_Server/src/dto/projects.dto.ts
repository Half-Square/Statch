/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-02-21 14:13:59                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-18 11:06:15                               *
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
import * as versionsDto from "./versions.dto";
import * as labelsDto from "./labels.dto";

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
    actualVersion: string;
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
  @IsIn(["new", "done", "reject", "progress", "wait"])
  @IsOptional()
    status: string;
  
  @IsString()
  @IsOptional()
    actualVersion: string;

  @IsArray()
  @IsOptional()
    versionList: versionsDto.PublicOutput;

  @IsString()
  @IsOptional()
    description: string;

  @IsArray()
    assignments: usersDto.PublicOutput[];

  @IsArray()
  @IsOptional()
    labels: labelsDto.PublicOutput[];
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
  @IsIn(["new", "done", "reject", "progress", "wait"])
    status: string;

  @IsString()
  @IsOptional()
    actualVersion: string;

  @IsArray()
  @IsOptional()
    assignments: usersDto.PublicOutput[];

  @IsArray()
  @IsOptional()
    versionList: versionsDto.PublicOutput;

  @IsArray()
  @IsOptional()
    labels: labelsDto.PublicOutput[];

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
      this.actualVersion = data.actualVersion;
      this.assignments = data.assignments?.map((el) => {
        return el.user;
      });
      this.labels = data.labels?.map((el) => { 
        return el.label;
      });
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
  @IsIn(["new", "done", "reject", "progress", "wait"])
    status: string;

  @IsString()
  @IsOptional()
    actualVersion: string;

  @IsArray()
  @IsOptional()
    versionList: versionsDto.PublicOutput;

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

  @IsArray()
  @IsOptional()
    labels: labelsDto.PublicOutput[];

  @IsNumber()
    progress: number;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.actualVersion = data.actualVersion;
      this.labels = data.labels?.map((el) => { 
        return el.label;
      });
      if (data.versionList)
        this.versionList = data.versionList.map((el) => new versionsDto.PublicOutput(el));
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
