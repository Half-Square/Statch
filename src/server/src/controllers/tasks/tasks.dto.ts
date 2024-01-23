/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-06-24 13:48:40                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-23 13:56:48                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * CreateInput
  * UpdateInput
*/

/* Imports */
import { IsString, IsOptional, IsIn, IsArray } from "class-validator";
/***/

/**
* CreateInput 
*/
class CreateInput {
  @IsString()
    name: string;

  @IsString()
    description: string;

  @IsString()
  @IsOptional()
    level: string;

  @IsString()
  @IsOptional()
    status: string;
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

  @IsArray()
  @IsOptional()
    assignments: [{userId: string}];

  @IsArray()
  @IsOptional()
    labels: [{labelId: string}];

  @IsString()
  @IsOptional()
    targetVersionId: string;
}
/***/

export {
  CreateInput,
  UpdateInput
};
