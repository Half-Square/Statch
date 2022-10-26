/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-21 10:02:28
 * @ Description: Data send on projects edit
 */

/* SUMMARY
    * Nest
    * DTO
*/

/* Nest */
import { IsString, IsOptional, IsArray, IsEmpty } from 'class-validator';
/***/

/* DTO */
import { PublicUserDto } from 'src/modules/users/dto/public-user.dto';
import { IsNull } from 'typeorm';
/***/

export class EditProjectsDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsOptional()
    version: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @IsOptional()
    assignees: PublicUserDto[];
}

