/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-24 17:56:12                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-24 18:12:49                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * UpdateInput
*/

/* Imports */
import { IsArray, IsString } from "class-validator";
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
