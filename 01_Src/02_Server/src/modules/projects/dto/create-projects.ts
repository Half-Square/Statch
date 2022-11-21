/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-18 14:57:21
 * @ Description: Projects creation model
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ObjectID } from "typeorm";
/***/

export class CreateProjectsDto {
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    version: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
