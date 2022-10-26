/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 13:23:00
 * @ Description: Manage users collection database access
 */

/* SUMMARY
    * Nest
    * Entities
    * Name: findAll
    * Name: findWithIds
    * Name: addSubscriptionsToMany
*/

/* Nest */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ObjectID, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
/***/

/* Entities */
import { Users } from '../users.entity';
/***/

@Injectable()
export class UsersDbService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>,
                private datasource: DataSource) {
    }

    /*
    * Name: findAll
    * Description: Get all items in users collection
    * 
    * Return (Users[]): List of all items in collection
    */
    public findAll(): Promise<Users[]> {
        return new Promise((resolve, reject) => {
            this.usersRepository.find().then((data) => {
                return resolve(data);
            }).catch((err) => {
                return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/

    /*
    * Name: findWithIds
    * Description: Transform array of ID to array of users
    * 
    * Args:
    * - ids (ObjectID[]): Users to get
    * 
    * Return (Users[]): Users found
    */
    public findWithIds(ids: ObjectID[]): Promise<Users[]> {
        return new Promise((resolve, reject) => {
            let toGet = ids.map((id) => {return new ObjectId(id)});
            
            this.datasource.getMongoRepository(Users).findBy({
                _id: {
                    $in: toGet
                }
            }).then((users) => {
                return resolve(users);
            }).catch((err) => {
                return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/

    /*
    * Name: addSubscriptionsToMany
    * Description: Create new subscription to many users
    * 
    * Args:
    * - users (Users[]): Users list to update
    * - id (ObjectID): Object to subscribe
    * - type (String): Subscription type (projects, tasks or tickets)
    *
    * Return (Users[]): Updated users
    */
    public addSubscriptionsToMany(users: Users[], id: ObjectID, type: string): Promise<Users[]> {
        return new Promise(async (resolve, reject) => {
            users.filter((user) => {
                return user.subscribes.find((el) => {el._id == new ObjectId(id)}) ? false : true;
            }).forEach((user) => {
                user.subscribes.push({_id: new ObjectId(id), type: type});
            });

            for (let i = 0; i < users.length; i++) {
                await this.datasource.getMongoRepository(Users).updateOne({
                    _id: new ObjectId(users[i]._id)
                }, {
                    $set: {subscribes: users[i].subscribes}
                }).catch((err) => {
                    return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
                });
            }

            return resolve(users);
        });
    }
    /***/
}
