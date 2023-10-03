/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-21 12:04:55                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-21 12:17:08                               *
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
