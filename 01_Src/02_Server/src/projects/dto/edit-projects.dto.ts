/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-21 10:02:28
 * @ Description: Data send on projects edit
 */

/* SUMMARY
*/

/* Entities */
import { Users } from '../../users/users.entity';
/***/

export class EditProjectsDto {
    assignees: Users[];
}

