/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-22 14:25:04                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-22 14:42:05                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import * as jwt from "jsonwebtoken";
/***/

@Injectable()
export class ConnectedGuard implements CanActivate {
  constructor(private prisma: PrismaService) {
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      if (Number(process.env.IS_DEV)) return true;

      let token: string = context.switchToHttp().getRequest().headers["x-token"];
      jwt.verify(token, process.env.SALT);
      return true;
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      return false;
    }
  }
}
