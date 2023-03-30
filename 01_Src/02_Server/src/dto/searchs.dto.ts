/******************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:11:59                               *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-28 12:16:09                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * DetailsOutput
  * PublicOutput
*/

/* Imports */
import {IsObject, IsString} from "class-validator";
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
