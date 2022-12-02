/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 16:58:13
 * @ Description: Public tasks information model
 */

/* SUMMARY
    * Nest
    * Dto
*/

/* Nest */
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectID } from "mongodb";
/***/

/* Dto */
import { PublicUserDto } from "src/modules/users/dto/public-user.dto";
/***/

export class PublicTasksDto {
    @IsString()
    @IsNotEmpty()
    _id: ObjectID

    @IsString()
    name: string;

    @IsNotEmpty()
    owner: PublicUserDto;

    @IsString()
    status: String;

    constructor(data) {
        if (data) {
            this._id = data._id;
            this.name = data.name;
            this.owner = data.owner;
            this.status = data.status;
        }
    }
}
