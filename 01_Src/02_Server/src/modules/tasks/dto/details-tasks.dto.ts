/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-03 14:23:12
 * @ Description: Tasks details DTO model
 */

/* SUMMARY
    * Nest
    * DTO
*/

/* Nest */
import { ObjectID } from "mongodb";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
/***/

/* DTO */
import { PublicUserDto } from "src/modules/users/dto/public-user.dto";
/***/

export class DetailsTasksDto {
    @IsString()
    @IsNotEmpty()
    _id: ObjectID;
    
    @IsString()
    @IsNotEmpty()
    project: ObjectID;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    created: number;

    @IsString()
    description: string;

    @IsArray()
    //@ValidateNested({each: true})
    //@Type(() => DetailsTasksDto)
    tickets: string[]; // To do

    @IsArray() // to do
    comments: number[];

    @IsString() // to do
    owner: string;

    @IsArray() // to do
    assignees: PublicUserDto[];

    constructor(data) {
        this._id = data._id;
        this.project = data.project;
        this.name = data.name;
        this.status = data.status;
        this.created = data.created;
        this.description = data.description;
        this.tickets = data.tickets;
        this.comments = data.comments;
        this.owner = data.owner;
        this.assignees = data.assignees;
    }
}
