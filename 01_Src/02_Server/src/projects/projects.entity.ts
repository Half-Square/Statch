/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 14:36:13
 * @ Description: Projects collection description
 */

/* SUMARY
    * Nest
*/

/* Nest */
import { Entity, Column, PrimaryGeneratedColumn, ObjectID } from "typeorm";
/***/

/* Entities */
import { Users } from '../users/users.entity';
/***/

@Entity()
export class Projects {
    @PrimaryGeneratedColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    status: string;

    @Column()
    version: string;

    @Column()
    created: number;

    @Column()
    description: string;

    @Column()
    docs: string[];

    @Column()
    tasks: number[];

    @Column()
    comments: number[];

    @Column()
    owner: number;

    @Column()
    assignees: ObjectID[];
}
