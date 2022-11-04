/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-04 09:49:28
 * @ Description: Comments collection descriptor
 */

/* SUMARY
    * Nest
*/

/* Nest */
import { Entity, Column, PrimaryGeneratedColumn, ObjectID } from "typeorm";
/***/

@Entity()
export class Projects {
    @PrimaryGeneratedColumn()
    _id: ObjectID;

    @Column()
    author: string;

    @Column()
    created: number;

    @Column()
    content: string;

    @Column()
    reply: ObjectID[];
}
