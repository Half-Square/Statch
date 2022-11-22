/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 17:13:25
 * @ Description: Tasks entity
 */

/* SUMARY
    * Nest
    * DTO
*/

/* Nest */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectID } from 'mongodb';
/***/

/* DTO */
import { PublicUserDto } from "../users/dto/public-user.dto";
/***/

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    _id: ObjectID;
    
    @Column()
    project: ObjectID;

    @Column()
    name: string;

    @Column()
    status: string;

    @Column()
    created: number;

    @Column()
    description: string;

    @Column() // update with @OneToMany
    tickets: string[];

    @Column() // update with @OneToMany
    comments: number[];

    @Column() // update with OneToOne
    owner: number;

    @Column() // update with @OneToMany
    assignees: PublicUserDto[];
}
