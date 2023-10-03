/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-24 17:56:12                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-26 14:44:47                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * UpdateInput
*/

/* Imports */
import { IsArray } from "class-validator";
/***/

/**
* UpdateInput 
*/
class UpdateInput {
  @IsArray()
    users: {id: string}[];
}
/***/

export {
  UpdateInput
};
