/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-19 14:22:01
 * @ Description: Complete projects informations
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectID } from "typeorm";
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

    @IsString()
    tasks: ObjectID[];

    @IsString()
    comments: ObjectID[];

    @IsString()
    @IsNotEmpty()
    owner: ObjectID;
    
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
