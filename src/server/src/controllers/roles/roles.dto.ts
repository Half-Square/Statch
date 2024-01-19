/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-06-19 17:06:36                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-19 14:39:04                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Create input
  * UpdateInput
*/

/* Imports */
import { IsArray, IsBoolean, IsJSON, IsOptional, IsString } from "class-validator";
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
    users: [];
  @IsBoolean()
    default: boolean;
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
    users: [];

  @IsBoolean()
    default: boolean;
}
/***/

export {
  CreateInput,
  UpdateInput
};
