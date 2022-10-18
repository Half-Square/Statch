/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 12:32:26
 * @ Description: Users collection description
 */

/* SUMARY
    * Nest
*/

/* Nest */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
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
    token: string;

    @Column()
    tokenStart: Date;

    @Column() // update with @OneToMany
    subscribes: number[];
}
