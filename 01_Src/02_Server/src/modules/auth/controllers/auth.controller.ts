/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-28 09:55:08
 * @ Description: Manage auth api endpoints
 */

/* SUMMARY
    * Nest
    * Services
    * Dto
    * Name: connectUser
*/

/* Nest */
import { Controller, Body } from '@nestjs/common';
/***/

/* Services */
import { FormatService } from 'src/services/format/format.service';
/***/

/* Dto */
import { ConnectUserDto } from '../../users/dto/connect-user.dto';
import { AuthUserDto } from '../../users/dto/auth-user.dto';
/***/

@Controller('auth')
export class AuthController {
    constructor(private format: FormatService) {
    }

    /*
    * Name: connectUser
    * Description: Connect user
    * 
    * Args:
    * - login (String): User login
    * - password (String): User password
    * 
    * Return (AuthUserDto): User details with auth token
    */
    async connectUser(@Body() body: ConnectUserDto): Promise<AuthUserDto> {
        try {
            return this.format.fromObject({}, AuthUserDto);
        } catch (err) {
            console.error(err);
            return err;
        }
    }
    /***/
}
