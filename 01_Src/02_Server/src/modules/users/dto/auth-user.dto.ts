/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-28 10:00:57
 * @ Description: Connection response model
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectID } from "typeorm";
/***/

export class AuthUserDto {
    @IsString()
    @IsNotEmpty()
    _id: ObjectID;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    tokenStart: Number;

    constructor(data) {
        if (data) {
            this._id = data._id;
            this.email = data.email
            this.name = data.name
            this.lastName = data.lastName
            this.image = data.image
            this.token = data.token
            this.tokenStart = data.tokenStart
        }
    }
}
