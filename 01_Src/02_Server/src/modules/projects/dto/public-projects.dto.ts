/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-18 14:21:33
 * @ Description: Public informations returned for projects collection
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { ObjectID } from "typeorm";
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
/***/

export class PublicProjectsDto {
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
    @IsNotEmpty()
    owner: ObjectID;

    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.status = data.status;
        this.version = data.version;
        this.created = data.created;
        this.description = data.description;
        this.owner = data.owner;
    }
}
