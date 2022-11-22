/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-03 14:35:43
 * @ Description: Create tasks DTO model
 */

/* SUMMARY
* Nest
*/

/* Nest */
import { IsNotEmpty, IsString } from "class-validator";
/***/

export class CreateTasksDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

