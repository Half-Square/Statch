/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:16:22                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-14 19:27:26                               *
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
import {IsOptional, IsString, IsArray, IsObject, IsNumber, IsIn} from "class-validator";
import {Ticket} from "@prisma/client";
import * as ticketsDto from "./tickets.dto";
import * as commentsDto from "./comments.dto";
/***/

/* Dto */
import * as usersDto from "../dto/users.dto";
import * as versionsDto from "../dto/users.dto";
import * as labelsDto from "../dto/labels.dto";
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
  @IsIn(["new", "done", "reject", "progress", "wait"])
  @IsOptional()
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
    level: string;

  @IsString()
    projectId: string;

  @IsString()
    created: string;

  @IsObject()
    owner: usersDto.PublicOutput;

  @IsObject()
    targetVersion: versionsDto.PublicOutput;
  
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
      this.projectId = data.projectId;
      this.created = data.created;
      this.owner = new usersDto.PublicOutput(data.owner);
      this.targetVersion = new versionsDto.PublicOutput(data.targetVersion);
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
    level: string;

  @IsString()
    created: Date;

  @IsArray()
    tickets: Ticket[];

  @IsString()
    projectId: string;

  @IsArray()
    comments: Comment[];

  @IsObject()
    owner: usersDto.PublicOutput;

  @IsArray()
    assignments: usersDto.PublicOutput;
    
  @IsObject()
    targetVersion: versionsDto.PublicOutput;

  @IsArray()
  @IsOptional()
    labels: labelsDto.PublicOutput[];

  @IsArray()
    activitys: activitysDto.TaskOutput[];
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.created = data.created;
      this.status = data.status;
      this.level = data.level;
      this.projectId = data.projectId;
      this.owner = new usersDto.PublicOutput(data.owner);
      this.labels = data.labels?.map((el) => { 
        return el.label;
      });
      this.assignments = data.assignments.map((el) => {
        return new usersDto.PublicOutput(el.user);
      });
      if (data.tickets) {
        this.tickets = data.tickets.map((el) => {
          el.task = { projectId: data.projectId };
          return new ticketsDto.PublicOutput(el);
        });
      }
      if (data.comments) {
        this.comments  = data.comments.map((el) => new commentsDto.PublicOutput(el));
      }
      this.targetVersion = new versionsDto.PublicOutput(data.targetVersion);
      this.activitys = data.activitys.map((el) => {
        return new activitysDto.TaskOutput(el);
      });
    }
  }
}
/***/

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
