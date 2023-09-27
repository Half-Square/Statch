/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-19 17:06:36                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-27 14:29:20                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Create input
  * UpdateInput
*/

/* Imports */
import { IsArray, IsIn, IsOptional, IsString } from "class-validator";
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
  @IsIn(["new", "done", "reject", "progress", "wait"])
  @IsOptional()
    status: string;

  @IsString()
  @IsOptional()
    actualVersion: string;
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
  @IsIn(["new", "done", "reject", "progress", "wait"])
  @IsOptional()
    status: string;
  
  @IsString()
  @IsOptional()
    actualVersion: string;

  @IsString()
  @IsOptional()
    description: string;

  @IsArray()
  @IsOptional()
    assignments: [{userId: string}];

  @IsArray()
  @IsOptional()
    labels: [{labelId: string}];
}
/***/

export {
  CreateInput,
  UpdateInput
};
