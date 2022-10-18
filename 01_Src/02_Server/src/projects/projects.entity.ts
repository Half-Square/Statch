/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 14:36:13
 * @ Description: Projects collection description
 */

/* SUMARY
    * Nest
*/

/* Nest */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
/***/

@Entity()
export class Projects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    status: string;

    @Column()
    version: string;

    @Column()
    created: Date;

    @Column()
    description: string;

    @Column()
    docs: string[];

    @Column() // update with @OneToMany
    tasks: number[];

    @Column() // update with @OneToMany
    comments: number[];

    @Column() // update with OneToOne
    owner: number;

    @Column() // update with @OneToMany
    assignees: number[];
}
