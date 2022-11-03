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
import { Type } from "class-transformer";
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { PublicTasksDto } from "src/modules/tasks/dto/public-tasks.dto";
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
    @ValidateNested({each: true})
    @Type(() => PublicTasksDto)
    @IsOptional()
    tasks: PublicTasksDto[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PublicUserDto)
    @IsOptional()
    assignees: PublicUserDto[];

    constructor(data) {
        this.name = data.name;
        this.status = data.status;
        this.version = data.version;
        this.description = data.description;
        this.tasks = data.tasks;
        this.assignees = data.assignees;
    }
}

