/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 16:58:13
 * @ Description: Public tasks information model
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { IsString } from "class-validator";
/***/

export class PublicTasksDto {
    @IsString()
    name: string;
}
