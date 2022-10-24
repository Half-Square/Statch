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
import { ObjectId } from 'mongodb';
/***/

export class PublicProjectsDto {
    _id: ObjectID;
    name: string;
    status: string;
    version: string;
    created: Date;
    description: string;
    owner: number;
    
    constructor(data) {
        console.log(data); // debug
        
        this._id = new ObjectId(data._id) || null;
        this.name = data.name || "";
        this.status = data.status || "new";
        this.version = data.version || "0.0.0";
        this.created = data.created || undefined;
        this.description = data.description || "";
        this.owner = data.owner || undefined;
    }
}
