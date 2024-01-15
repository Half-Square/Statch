/* Imports */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2024-01-15 16:21:58                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-15 16:39:56                               *
 *****************************************************************************/

/* Services */
import { Reflector } from "@nestjs/core";
import { PrismaService } from "src/prisma.service";
/***/

@Injectable()
export class IsPermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {

    const actionsCheck = this.reflector.get<{ type: string, actions: string[] }[]>("permissions", context.getHandler());

    if (!actionsCheck) {
      return true;
    }

    const token = context.switchToHttp().getRequest().headers["x-token"];
    const user = await this.prisma.user.findFirst({
      where: { id: jwt.verify(token, process.env.SALT).id },
      include: {
        role: true
      }
    });

    if (!user || !user.role) {
      throw new ForbiddenException("User not found or role not assigned");
    }

    const roles = user.role;

    const permissions = JSON.parse(roles.permissions)[0];
    let hasPermission = true;

    for (const actionSet of actionsCheck) {
      const elementType = actionSet.type;
      const actions = actionSet.actions;

      for (const action of actions) {
        if (!permissions[elementType][action]) {
          hasPermission = false;
        } else if (typeof permissions[elementType][action] === "object") {
          const subActions = Object.values(permissions[elementType][action]);

          if (subActions.includes(false)) {
            hasPermission = false;
          }
        }
      }
    }

    if (hasPermission)
      return true;

    throw new ForbiddenException("You do not have the necessary permission to perform this action");
  }
}
