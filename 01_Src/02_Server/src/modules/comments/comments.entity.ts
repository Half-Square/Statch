/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-04 09:49:28
 * @ Description: Comments collection descriptor
 */

/* SUMARY
    * Nest
*/

/* Nest */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectID } from "mongodb";
/***/

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    _id: ObjectID;

    @Column()
    author: ObjectID;

    @Column()
    created: number;

    @Column()
    content: string;

    @Column()
    reply: ObjectID[];

    @Column()
    parent: ObjectID;
}
