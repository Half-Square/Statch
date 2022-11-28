/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-28 10:11:55
 * @ Description: Token check et generation service
 */

/* SUMMARY
    * Nest
    * Name: checkPassword
    * Name: genToken
*/

/* Nest */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { sha256 } from 'js-sha256';
/***/

@Injectable()
export class TokenService {
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
}
