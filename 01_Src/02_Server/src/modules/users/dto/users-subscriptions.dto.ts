/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-26 15:15:09
 * @ Description: Users subscription model
 */

/* Nest */
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectID } from "typeorm";
/***/

export class UsersSubscriptionsDto {
    @IsString()
    @IsNotEmpty()
    _id: ObjectID;

    @IsString()
    @IsNotEmpty()
    type: string;
}
