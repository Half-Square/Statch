/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-21 16:35:17
 * @ Description: Details comments model
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ObjectID } from 'mongodb';
/***/

export class DetailsCommentsDto {
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

    @IsArray() // temp, validate nested Object reply
    reply: ObjectID[];

    constructor(data) {
        if(data) {
            this._id = data._id;
            this.author = data.author;
            this.created = data.created;
            this.content = data.content;
            this.parent = data.parent;
            this.reply = data.reply;
        }
    }
}

