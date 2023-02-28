/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:16:22                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-28 14:10:22                               *
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
import {IsOptional, IsString, IsArray, IsObject} from "class-validator";
import {Ticket} from "@prisma/client";
import * as ticketsDto from "./tickets.dto";
import * as commentsDto from "./comments.dto";
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
    projectId: string;

  @IsString()
    created: string;

  @IsObject()
    owner: usersDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.status = data.status;
      this.projectId = data.projectId;
      this.created = data.created;
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
    created: Date;

  @IsArray()
    tickets: Ticket[];

  @IsString()
    projectId: string;

  @IsArray()
    comments: Comment[];

  @IsObject()
    owner: usersDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.created = data.created;
      this.status = data.status;
      this.projectId = data.projectId;
      this.owner = new usersDto.PublicOutput(data.owner);

      if (data.tickets) {
        this.tickets = data.tickets.map((el) => new ticketsDto.PublicOutput(el));
      }

      if (data.comments) {
        this.comments  = data.comments.map((el) => new commentsDto.PublicOutput(el));
      }
    }
  }
}
/***/

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
