/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 13:23:00
 * @ Description: Manage users collection database access
 */

/* SUMMARY
    * Nest
    * Entities
    * Name: findAll
*/

/* Nest */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
/***/

/* Entities */
import { Users } from '../users.entity';
/***/

@Injectable()
export class UsersDbService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
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
}
