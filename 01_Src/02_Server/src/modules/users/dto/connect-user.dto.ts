/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-28 10:00:57
 * @ Description: Connection request model
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectID } from "typeorm";
/***/

export class ConnectUserDto {
    @IsString()
    @IsNotEmpty()
    _id: ObjectID;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor(data) {
        if (data) {
            this._id = data._id;
            this.email = data.email;
            this.password = data.password;
        }
    }
}
