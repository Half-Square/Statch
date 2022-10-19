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
/***/

export class PublicProjectsDto {
    _id: ObjectID;
    name: string;
    status: string;
    version: string;
    created: Date;
    description: string;
    docs: string[];
    owner: number;
    
    constructor(data) {
        this._id = data._id || null;
        this.name = data.name || "";
        this.status = data.status || "new";
        this.version = data.version || "0.0.0";
        this.created = data.created || undefined;
        this.description = data.description || "";
        this.docs = data.docs || [];
        this.owner = data.owner || undefined;
    }
}