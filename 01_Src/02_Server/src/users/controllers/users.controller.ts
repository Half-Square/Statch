/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 13:14:49
 * @ Description: Manage users request
 */

/* SUMMARY
    * Nest
    * DTO
    * Services
    * Name: getAll
*/

/* Nest */
import { Controller, Get } from '@nestjs/common';
/***/

/* DTO */
import { PublicUserDto } from '../dto/public-user.dto';
/***/

/* Services */
import { UsersDbService } from '../services/users-db.service';
/***/

@Controller('users')
export class UsersController {
    constructor(private users: UsersDbService) {
    }

    /*
    * Name: getAll
    * Description: Find and return all users saved
    * 
    * Return (PublicUserDto[]): List of all users saved 
    */
    @Get()
    async getAll(): Promise<PublicUserDto[]> {
        let users = await this.users.findAll();
        let ret = [];

        users.forEach((el) => {
            ret.push(new PublicUserDto(el));
        });

        return ret;
    }
    /***/
}
