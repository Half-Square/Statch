/******************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:11:59                               *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-23 15:14:00                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * DetailsOutput
  * PublicOutput
*/

/* Imports */
import {IsObject, IsString, IsArray} from "class-validator";
/***/

/* Dto */
import * as tasksDto from "../dto/tasks.dto";
import * as ticketsDto from "../dto/tickets.dto";
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
* DetailsOutput
*/
class DetailsOutput {
  @IsString()
    id: string;

  @IsString()
    name: Date;

  @IsString()
    projectId: string;

  @IsArray()
    tasks: tasksDto.PublicOutput;

  @IsArray()
    tickets: ticketsDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.projectId = data.projectId;
      this.tasks = data.tasks.map((el) => new tasksDto.PublicOutput(el));
      this.tickets = data.tickets.map((el) => new ticketsDto.PublicOutput(el));
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
    name: Date;

  @IsString()
    projectId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.projectId = data.projectId;
    }
  }
}
/***/

export {CreateInput, PublicOutput, DetailsOutput};
