/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-20 15:43:46                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-20 15:49:31                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * Update input
*/

/* Imports */
import { IsString } from "class-validator";
/***/

/**
* Create input 
*/
class CreateInput {
  @IsString()
    name: string;

  @IsString()
    description: string;

  @IsString()
    color: string;
}
/***/

/**
* Update input 
*/
class UpdateInput {
  @IsString()
    name: string;

  @IsString()
    description: string;

  @IsString()
    color: string;
}
/***/

export {
  CreateInput,
  UpdateInput
};
