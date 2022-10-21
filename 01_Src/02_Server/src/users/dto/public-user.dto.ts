/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 13:18:54
 * @ Description: Public informations DTO returned for users collection
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { ObjectID } from "typeorm";
/***/

export class PublicUserDto {
    _id: ObjectID;
    name: string;
    lastName: string;
    email: string;
    image: string;

    constructor(data) {
        this._id = data._id || null;
        this.name = data.name || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.image = data.image || ''
    }
}
