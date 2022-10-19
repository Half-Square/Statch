/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-19 14:22:01
 * @ Description: Complete projects informations
 */

/* SUMMARY
*/

/* Nest */
import { ObjectID } from "typeorm";
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
}