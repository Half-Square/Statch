/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 13:18:54
 * @ Description: Public informations DTO returned for users collection
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ObjectID } from "typeorm";
/***/

export class PublicUserDto {
    @IsString()
    @IsNotEmpty()
    _id: ObjectID;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    image: string;

    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.lastName = data.lastName;
        this.email = data.email;
        this.image = data.image;
    }
}
