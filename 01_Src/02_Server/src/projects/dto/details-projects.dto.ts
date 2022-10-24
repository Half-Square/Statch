/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-19 14:22:01
 * @ Description: Complete projects informations
 */

/* SUMMARY
*/

/* Nest */
import { ObjectID } from "typeorm";
import { ObjectId } from 'mongodb';
/***/

export class DetailsProjectsDto {
    _id: ObjectID;
    name: string;
    status: string;
    version: string;
    created: number;
    description: string;
    docs: string[];
    tasks: number[];
    comments: number[];
    owner: number;
    assignees: number[];

    constructor (data) {        
        this._id = new ObjectId(data._id) || null;
        this.name = data.name || '';
        this.status = data.status || '';
        this.version = data.version || '0.0.0';
        this.created = data.created || 0;
        this.description = data.description || '';
        this.docs = data.docs || [];
        this.tasks = data.tasks || [];
        this.comments = data.comments || [];
        this.owner = data.owner || 0;
        this.assignees = data.assignees || [];
    }
}
