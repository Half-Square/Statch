/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-28 10:11:55
 * @ Description: Token check et generation service
 */

/* SUMMARY
    * Nest
    * Entities
    * Node modules
    * Name: checkPassword
    * Name: genToken
    * Name: checkValidity
*/

/* Nest */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
/***/

/* Entities */
import { Users } from 'src/modules/users/users.entity';
/***/

/* Services */
import { UsersDbService } from 'src/modules/users/services/users-db.service';
/***/

/* Node modules */
import { sha256 } from 'js-sha256';
/***/

@Injectable()
export class TokenService {
    constructor(private userDb: UsersDbService) {
    }

    /*
    * Name: checkPassword
    * Description: Verify user password
    * 
    * Args:
    * - toCheck (String): Password sent to check
    * - userPasswd (String): Saved user password
    */
    public checkPassword(toCheck: String, userPasswd: String): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (sha256(<string>toCheck) === userPasswd) return resolve();
            return reject(new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED));
        });
    }
    /***/

    /*
    * Name: genToken
    * Description: Generate token
    * 
    * Args:
    * - data (any): Data to hash
    * 
    * Return (String): Unique token
    */
    public genToken(data: any): any {
        let token = {
            value: sha256(JSON.stringify(data)+Date.now()),
            start: Math.round(new Date().getTime()/1000) // In unix format
        };

        return token;
    }
    /***/

    /*
    * Name: checkValidity
    * Description: Check token timeout
    * 
    * Args:
    * - token (String): Token
    * - user (Users): 
    * 
    * Return (Boolean): Token is valid or not
    */
    public checkValidity(token: any, user: Users): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const timeout = Number(user.tokenStart)+Number(process.env.TOKEN_TIMEOUT);
            
            if (Math.round(new Date().getTime()/1000) < timeout) {
                return resolve(true);
            } else {
                await this.userDb.clearToken(user._id);
                return reject(false);
            }
        });
    }
    /***/
}
