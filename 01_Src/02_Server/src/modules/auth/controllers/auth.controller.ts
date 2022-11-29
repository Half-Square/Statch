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
import { Controller, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
/***/

/* Services */
import { FormatService } from 'src/services/format/format.service';
import { UsersDbService } from 'src/modules/users/services/users-db.service';
import { TokenService } from '../services/token.service';
/***/

/* Dto */
import { ConnectUserDto } from '../../users/dto/connect-user.dto';
import { AuthUserDto } from '../../users/dto/auth-user.dto';
/***/

@Controller('auth')
export class AuthController {
    constructor(private format: FormatService,
                private usersDb: UsersDbService,
                private token: TokenService) {
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
    @Post()
    async connectUser(@Body() body: ConnectUserDto): Promise<AuthUserDto> {
        try {
            let user = await this.usersDb.getByEmail(body.email);
            await this.token.checkPassword(body.password, user.password);

            let token = await this.token.genToken(user);
            user.token = token.value;
            user.tokenStart = token.start;

            await this.usersDb.saveToken(user._id, user.token, user.tokenStart);

            return this.format.fromObject(user, AuthUserDto);
        } catch (err) {
            return err;
        }
    }
    /***/
}
