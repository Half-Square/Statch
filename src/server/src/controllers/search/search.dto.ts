/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:11:59                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-29 14:59:44                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * DetailsOutput
  * PublicOutput
*/

/* Imports */
import {IsString} from "class-validator";
/***/

/**
* SearchResponse 
*/
class SearchResponse {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    icon: string;

  @IsString()
    type: string;
}
/***/

/**
* ProjectOutput 
*/
class ProjectOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    icon: string;

  @IsString()
    type: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.icon = data.status;
      this.type = "project";
    }
  }
}
/***/

/**
* TaskOutput 
*/
class TaskOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    icon: string;

  @IsString()
    type: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.icon = data.status;
      this.type = "task";
    }
  }
}
/***/

/**
* TaskOutput 
*/
class TicketOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    icon: string;

  @IsString()
    type: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.icon = data.status;
      this.type = "ticket";
    }
  }
}
/***/

export { SearchResponse, ProjectOutput, TaskOutput, TicketOutput};
