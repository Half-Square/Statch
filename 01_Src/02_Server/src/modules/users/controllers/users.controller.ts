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
import { Controller, Get, UseGuards } from '@nestjs/common';
/***/

/* DTO */
import { PublicUserDto } from '../dto/public-user.dto';
/***/

/* Services */
import { FormatService } from 'src/services/format/format.service';
import { UsersDbService } from '../services/users-db.service';
/***/

/* Guards */
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
/***/

@Controller('users')
@UseGuards(AuthGuard)
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
            let users = await this.users.getAll();
            return this.format.fromArray(users, PublicUserDto);
        } catch (error) {
            throw error;
        }
    }
    /***/
}
