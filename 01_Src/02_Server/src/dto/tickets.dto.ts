/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:18:25                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-18 14:04:41                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * UpdateInput
  * PublicOutput
  * DetailsOutput
*/

/* Imports */
import {IsArray, IsIn, IsObject, IsOptional, IsString} from "class-validator";
/***/

/* Dto */
import * as commentsDto from "../dto/comments.dto";
import * as usersDto from "../dto/users.dto";
import * as versionsDto from "../dto/versions.dto";
import * as labelsDto from "./labels.dto";
import * as activitysDto from "../dto/activitys.dto";
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
  @IsIn(["new", "done", "reject", "progress", "wait"])
    status: string;

  @IsString()
  @IsIn(["low", "normal", "moderate", "high"])
  @IsOptional()
    level: string;
    
  @IsString()
  @IsOptional()
    description: string;

  @IsArray()
    assignments: usersDto.PublicOutput[];
  
  @IsObject()
  @IsOptional()
    targetVersion: versionsDto.PublicOutput;

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
    description: string;

  @IsString()
  @IsIn(["new", "done", "reject", "progress", "wait"])
    status: string;

  @IsString()
  @IsIn(["low", "normal", "moderate", "high"])
  @IsOptional()
    level: string;

  @IsString()
    created: string;

  @IsString()
    projectId: string;

  @IsString()
    taskId: string;

  @IsObject()
    owner: usersDto.PublicOutput;

  @IsObject()
    targetVersion: versionsDto.PublicOutput;

  @IsArray()
  @IsOptional()
    assignments: usersDto.PublicOutput[];

  @IsArray()
  @IsOptional()
    labels: labelsDto.PublicOutput[];

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.status = data.status;
      this.level = data.level;      
      this.created = data.created;
      this.projectId = data.task.projectId;
      this.taskId = data.taskId;
      this.targetVersion = data.targetVersion;
      this.assignments = data.assignments?.map((el) => {
        return el.user;
      });
      this.owner = new usersDto.PublicOutput(data.owner);
      this.labels = data.labels?.map((el) => { 
        return el.label;
      });
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
  @IsIn(["new", "done", "reject", "progress", "wait"])
    status: string;

  @IsString()
  @IsIn(["low", "normal", "moderate", "high"])
  @IsOptional()
    level: string;

  @IsString()
    created: Date;

  @IsString()
    projectId: string;

  @IsString()
    taskId: string;

  @IsArray()
    comments: Comment[];

  @IsObject()
    owner: usersDto.PublicOutput;

  @IsObject()
    targetVersion: versionsDto.PublicOutput;

  @IsArray()
    assignments: usersDto.PublicOutput[];

  @IsArray()
  @IsOptional()
    labels: labelsDto.PublicOutput[];

  @IsArray()
    activitys: activitysDto.TicketOutput[];
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.status = data.status;
      this.level = data.level;
      this.created = data.created;
      this.projectId = data.task.projectId;
      this.taskId = data.taskId;
      this.owner = new usersDto.PublicOutput(data.owner);
      this.targetVersion = data.targetVersion;
      this.labels = data.labels?.map((el) => { 
        return el.label;
      });
      this.assignments = data.assignments.map((el) => {
        return new usersDto.PublicOutput(el.user);
      });      
      if (data.comments) {
        this.comments = data.comments.map((el) => new commentsDto.PublicOutput(el));
      }
      this.activitys = data.activitys.map((el) => {
        return new activitysDto.TaskOutput(el);
      });
    }
  }
}
/***/

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
