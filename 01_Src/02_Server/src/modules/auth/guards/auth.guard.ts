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
/***/

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private usersDb: UsersDbService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers['x-token'];

            let user = await this.usersDb.getByToken(token);
            // Todo: Check token validity
            return true;
        } catch (err) {
            return false;
        }
    }
}
