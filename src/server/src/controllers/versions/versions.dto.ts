/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2023-09-21 12:04:55                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-08-27 10:49:05                               *
 *****************************************************************************/

import { IsString } from "class-validator";

/* SUMMARY
  * Imports
  * Create input
  * Update input
*/

/* Imports */

/***/

/** 
* Create input
*/
class CreateInput {
  @IsString()
    name: string;
}
/***/

/** 
* Update input
*/
class UpdateInput {
  @IsString()
    name: string;
}
/***/

export {
  CreateInput,
  UpdateInput
};
