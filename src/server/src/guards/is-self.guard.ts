/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-25 13:53:15                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-25 13:57:41                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/***/

@Injectable()
export class IsSelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const req = context.switchToHttp().getRequest();
      const token = jwt.verify(req.headers["x-token"], process.env.SALT);
      const id = req.params.id;
  
      return token.id === id;
    } catch (err) {
      return false;
    }
  }
}
