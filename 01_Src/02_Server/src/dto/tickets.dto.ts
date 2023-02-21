/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:18:25                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-21 14:20:19                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * UpdateInput
  * PublicOutput
  * DetailsOutput
*/

/* Imports */
import {IsOptional, IsString} from "class-validator";
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
    taskId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.taskId = data.taskId;
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
    taskId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.taskId = data.taskId;
    }
  }
}
/***/

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
