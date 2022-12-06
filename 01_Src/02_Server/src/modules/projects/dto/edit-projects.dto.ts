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
import { IsString, IsOptional, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { ObjectID } from "mongodb";
/***/

/* DTO */
import { PublicUserDto } from 'src/modules/users/dto/public-user.dto';
import { PublicTasksDto } from "src/modules/tasks/dto/public-tasks.dto";
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
    tasks: ObjectID[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PublicUserDto)
    @IsOptional()
    assignees: PublicUserDto[];

    @IsArray()
    comments: ObjectID[];

    @IsArray()
    @Type(() => String)
    @IsOptional()
    docs: String[];

    constructor(data) {
        if (data) {
            this.name = data.name;
            this.status = data.status;
            this.version = data.version;
            this.description = data.description;
            this.tasks = data.tasks;
            this.assignees = data.assignees;
            this.docs = data.docs;
        }
    }
}

