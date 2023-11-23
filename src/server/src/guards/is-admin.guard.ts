/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-20 17:27:56                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-11-23 14:16:47                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
/***/

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      if (process.env.DISABLE_GUARDS === "true") return true; // Ignore guard

      const token = context.switchToHttp().getRequest().headers["x-token"];
      const user = await this.prisma.user.findFirst({
        where: {id: jwt.verify(token, process.env.SALT).id}
      });

      if (user.isAdmin) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }
}
