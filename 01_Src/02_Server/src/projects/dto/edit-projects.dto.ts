/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-21 10:02:28
 * @ Description: Data send on projects edit
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { ObjectID } from 'typeorm';
/***/

export class EditProjectsDto {
    name: string;
    status: string;
    version: string;
    description: string;
    assignees: ObjectID[];
}

