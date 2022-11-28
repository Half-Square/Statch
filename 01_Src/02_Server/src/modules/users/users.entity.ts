/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 12:32:26
 * @ Description: Users collection description
 */

/* SUMARY
    * Nest
*/

/* Nest */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ObjectID } from "typeorm";
/***/

/* DTO */
import { UsersSubscriptionsDto } from './dto/users-subscriptions.dto';
/***/

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    _id: ObjectID;

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
    tokenStart: Number;

    @Column() // update with @OneToMany
    subscribes: UsersSubscriptionsDto[];
}
