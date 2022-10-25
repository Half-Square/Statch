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
import { IsString, IsNotEmpty } from 'class-validator';
/***/

/* DTO */
import { PublicUserDto } from 'src/modules/users/dto/public-user.dto';
/***/

export class EditProjectsDto {
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    version: string;

    @IsString()
    description: string;

    assignees: PublicUserDto[];
}

