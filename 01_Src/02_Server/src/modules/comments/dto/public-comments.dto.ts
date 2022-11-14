/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-14 09:23:59
 * @ Description: Public comments model
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ObjectID } from 'mongodb';
/***/

export class PublicCommentsDto {
    @IsString()
    @IsNotEmpty()
    _id: ObjectID;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNumber()
    @IsNotEmpty()
    created: number;

    @IsString()
    content: string;

    @IsString()
    @IsNotEmpty()
    parent: ObjectID;

    constructor(data) {
        if(data) {
            this._id = data._id;
            this.author = data.author;
            this.created = data.created;
            this.content = data.content;
            this.parent = data.parent;
        }
    }
}

