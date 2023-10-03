/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-24 17:20:05                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-24 17:20:42                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
*/

/* Imports */
import { IsString } from "class-validator";
/***/

/**
* CreateInput 
*/
class CreateInput {
  @IsString()
    content: string;
}
/***/

export {
  CreateInput
};
