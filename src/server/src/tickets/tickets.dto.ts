/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-24 13:45:39                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-24 14:20:32                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * UpdateInput
*/

/* Imports */
import { IsString, IsOptional, IsIn } from "class-validator";
/***/

/**
* CreateInput 
*/
class CreateInput {
  @IsString()
    name: string;

  @IsString()
    description: string;
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
  @IsIn(["low", "normal", "moderate", "high"])
  @IsOptional()
    level: string;

  @IsString()
  @IsOptional()
    description: string;
}
/***/

export {
  CreateInput,
  UpdateInput
};
