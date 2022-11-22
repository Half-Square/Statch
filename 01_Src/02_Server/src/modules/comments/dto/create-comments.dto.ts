/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-15 16:19:51
 * @ Description: Create comments model descriptor
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { IsString } from "class-validator";
/***/

export class CreateCommentsDto {
    @IsString()
    content: string;

    constructor(data) {
        if (data) {
            this.content = data.content;
        }
    }
}

