/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-19 17:06:36                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-29 12:35:39                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Create input
  * UpdateInput
*/

/* Imports */
import { IsArray, IsJSON, IsOptional, IsString } from "class-validator";
/***/

/**
* Create input 
*/
class CreateInput {
  @IsString()
    name: string;
  @IsArray()
    permissions: any;
  @IsArray()
  @IsOptional()
    users: [{userId: string}];
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
    persmissions: string;

  @IsArray()
  @IsOptional()
    users: [{userId: string}];
}
/***/

export {
  CreateInput,
  UpdateInput
};
