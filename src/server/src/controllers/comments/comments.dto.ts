/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2023-06-24 17:20:05                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-08-16 11:21:28                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * Edit input
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

/**
* Edit input 
*/
class EditInput {
  @IsString()
    content: string;
  
  @IsString()
    created: string;

  @IsString()
    authorId: string;
}
/***/

export {
  CreateInput,
  EditInput
};
