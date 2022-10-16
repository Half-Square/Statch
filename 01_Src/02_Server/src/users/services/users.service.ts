/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 13:23:00
 * @ Description: Users database access
 */

/* SUMMARY
    * Nest
    * Entities
    * Name: findAll
*/

/* Nest */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
/***/

/* Entities */
import { Users } from '../users.entity';
/***/

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
    }

    /*
    * Name: findAll
    * Description: Get all items in users collection
    * 
    * Return (Any[]): List of all items in collection
    */
    public findAll(): any {
        return this.usersRepository.find();
    }
    /***/
}
