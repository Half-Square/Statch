/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 12:32:26
 * @ Description:
 */

/* SUMARY
    * Nest
*/

/* Nest */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
/***/

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    image: string;

    @Column()
    role: number;

    @Column()
    token: string;

    @Column()
    tokenStart: Date;

    @Column()
    subscribes: number[];
}
