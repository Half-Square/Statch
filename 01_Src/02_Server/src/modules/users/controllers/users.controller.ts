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
import { FormatService } from 'src/services/format/format.service';
import { UsersDbService } from '../services/users-db.service';
/***/

@Controller('users')
export class UsersController {
    constructor(private users: UsersDbService,
                private format: FormatService) {
    }

    /*
    * Name: getAll
    * Description: Find and return all users saved
    * 
    * Return (PublicUserDto[]): List of all users saved 
    */
    @Get()
    async getAll(): Promise<PublicUserDto[]> {
        try {
            let users = await this.users.findAll();
            return this.format.fromArray(users, PublicUserDto);
        } catch (error) {
            return error;
        }
    }
    /***/
}
