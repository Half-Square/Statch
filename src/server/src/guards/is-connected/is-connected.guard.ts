/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-24 13:31:26                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-26 13:58:27                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/***/

@Injectable()
export class IsConnectedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    try {
      if (process.env.DISABLE_GUARDS) return true; // Ignore guard

      const token = context.switchToHttp().getRequest().headers["x-token"];
      jwt.verify(token, process.env.SALT);
      return true;
    } catch (err) {
      return false;
    }
  }
}
