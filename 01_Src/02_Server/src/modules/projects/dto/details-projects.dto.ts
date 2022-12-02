/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-19 14:22:01
 * @ Description: Complete projects informations
 */

/* SUMMARY
    * Nest
    * DTO
*/

/* Nest */
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { ObjectID } from "mongodb";
/***/

/* DTO */
import { DetailsTasksDto } from "src/modules/tasks/dto/details-tasks.dto";
import { PublicTasksDto } from "src/modules/tasks/dto/public-tasks.dto";
import { PublicUserDto } from "src/modules/users/dto/public-user.dto";
/***/

export class DetailsProjectsDto {
    @IsString()
    @IsNotEmpty()
    _id: ObjectID;

    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    version: string;

    @IsNumber()
    @IsNotEmpty()
    created: number;

    @IsString()
    description: string;

    @IsString()
    docs: string[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PublicTasksDto)
    tasks: PublicTasksDto[];

    @IsString()
    comments: ObjectID[];

    @IsString()
    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => PublicUserDto)
    owner: PublicUserDto;
    
    assignees: ObjectID[];

    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.status = data.status;
        this.version = data.version;
        this.created = data.created;
        this.description = data.description;
        this.docs = data.docs;
        this.tasks = data.tasks;
        this.comments = data.comments;
        this.owner = data.owner;
        this.assignees = data.assignees;
    }
}
