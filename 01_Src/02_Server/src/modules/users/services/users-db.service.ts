/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 13:23:00
 * @ Description: Manage users collection database access
 */

/* SUMMARY
    * Nest
    * Entities
    * Node modules
    * Name: getAll
    * Name: getById
    * Name: getByEmail
    * Name: getByToken
    * Name: findWithIds
    * Name: addSubscriptionsToMany
    * Name: saveToken
    * Name: clearToken
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

/* Node modules */
import * as _ from 'lodash';
/***/

@Injectable()
export class UsersDbService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>,
                private datasource: DataSource) {
    }

    /*
    * Name: getAll
    * Description: Get all items in users collection
    * 
    * Return (Users[]): List of all items in collection
    */
    public getAll(): Promise<Users[]> {
        return new Promise((resolve, reject) => {
            this.usersRepository.find().then((data) => {
                return resolve(data);
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/

    /*
    * Name: getById
    * Description: Get user by id
    * 
    * Args:
    * - id (ObjectID): User id
    * 
    * Return (Users): User data
    */
    public getById(id: ObjectID): Promise<Users> {
        return new Promise((resolve, reject) => {
            if (!ObjectId.isValid(id)) return reject(new HttpException('Invalid Id', HttpStatus.BAD_REQUEST));

            this.usersRepository.findOneBy({_id: new ObjectId(id)}).then((user) => {
                if (!user) return reject(new HttpException('User Not Found', HttpStatus.NOT_FOUND));
                else return resolve(user);
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException('Inernal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/

    /*
    * Name: getByEmail
    * Description: Get user by email
    * 
    * Args:
    * - email (String): User email
    * 
    * Return (Users): User data
    */
    public getByEmail(email: string): Promise<Users> {
        return new Promise((resolve, reject) => {
            this.usersRepository.findOneBy({email: email}).then((user) => {
                if (!user) return reject(new HttpException('User Not Found', HttpStatus.NOT_FOUND));
                else return resolve(user);
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException('Inernal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/

    /*
    * Name: getByToken
    * Description: Get user data by authentification token
    * 
    * Args:
    * - token (String): User token
    * 
    * Return (Users): User data
    */
    public getByToken(token: string): Promise<Users> {
        return new Promise((resolve, reject) => {
            this.usersRepository.findOneBy({token: token}).then((user) => {
                if (user) return resolve(user);
                else return reject(new HttpException('User Not Found', HttpStatus.NOT_FOUND));
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
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
                console.error(err);
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
                return _.find(user.subscribes, (el) => el._id == id) ? false : true;
            }).forEach((user) => {
                user.subscribes.push({_id: new ObjectId(id), type: type});
            });

            for (let i = 0; i < users.length; i++) {
                await this.datasource.getMongoRepository(Users).updateOne({
                    _id: new ObjectId(users[i]._id)
                }, {
                    $set: {subscribes: users[i].subscribes}
                }).catch((err) => {
                    console.error(err);
                    return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
                });
            }

            return resolve(users);
        });
    }
    /***/

    /*
    * Name: saveToken
    * Description: Update token in user
    * 
    * Args:
    * id (ObjectID): User ID
    * token (String): Token to update
    * tokenStart (Number): Token start time
    */
    public saveToken(id, token, start): Promise<void> {
        return new Promise((resolve, reject) => {
            this.datasource.getMongoRepository(Users).updateOne({
                _id: new ObjectId(id)
            }, {
                $set: {
                    token: token || null,
                    tokenStart: start || null
                }
            }).then((res) => {
                if (res.matchedCount === 1) return resolve();
                throw 'No user matched';
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/

    /*
    * Name: clearToken
    * Description: Clear user token, reset tokenStart
    * 
    * Args:
    * - id (ObjectID): User id
    */
    public clearToken(id: ObjectID): Promise<void> {
        return new Promise((resolve, reject) => {
            this.datasource.getMongoRepository(Users).updateOne({
                _id: new ObjectId(id)
            }, {
                $set: {
                    token: null,
                    tokenStart: null
                }
            }).then(() => {
                return resolve();
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/
}
