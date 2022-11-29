/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-28 12:50:29
 * @ Description: Authentification guard, manage user access if logged
 */

/* SUMMARY
    * Nest
    * Services
*/

/* Nest */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
/***/

/* Services */
import { UsersDbService } from 'src/modules/users/services/users-db.service';
import { TokenService } from '../services/token.service';
/***/

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private usersDb: UsersDbService,
                private token: TokenService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers['x-token'];

            let user = await this.usersDb.getByToken(token);
            await this.token.checkValidity(token, user);

            return true;
        } catch (err) {
            return false;
        }
    }
}
