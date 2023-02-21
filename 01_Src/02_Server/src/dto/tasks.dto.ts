/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:16:22                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-21 14:18:17                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * UpdateInput
  * PublicOutput
  * DetailsOutput
*/

/* Imports */
import {IsOptional, IsString, IsArray} from "class-validator";
import {Ticket} from "@prisma/client";
import * as ticketsDto from "./tickets.dto";
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
    projectId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.projectId = data.projectId;
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

  @IsArray()
    tickets: Ticket[];

  @IsString()
    projectId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.tickets = data.tickets.map((el) => new ticketsDto.PublicOutput(el));
      this.projectId = data.projectId;
    }
  }
}
/***/

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
