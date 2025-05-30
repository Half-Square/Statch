/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2023-09-21 12:04:55                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2025-05-30 10:05:17                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Create input
  * Update input
*/

/* Imports */
import { Optional } from "@nestjs/common";
import { IsString } from "class-validator";
/***/

/** 
* Create input
*/
class CreateInput {
  @IsString()
    name: string;

  @IsString()
  @Optional()
    description: string;
}
/***/

/** 
* Update input
*/
class UpdateInput {
  @IsString()
    name: string;

  @IsString()
  @Optional()
    description: string;
}
/***/

export {
  CreateInput,
  UpdateInput
};
