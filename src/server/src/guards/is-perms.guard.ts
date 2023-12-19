/* Imports */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/***/

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
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user || !user.roles) {
      throw new ForbiddenException("User not found or role not assigned");
    }

    const roles = user.roles;

    for (const userRole of roles) {
      const permissions = JSON.parse(userRole.role.permissions)[0];
      let hasPermission = true;

      for (const actionSet of actionsCheck) {
        const elementType = actionSet.type;
        const actions = actionSet.actions;

        for (const action of actions) {
          if (!permissions[elementType][action]) {
            hasPermission = false;
          } else if (typeof permissions[elementType][action] === "object") {
            const subActions = Object.values(permissions[elementType][action]);

            // eslint-disable-next-line max-depth
            if (subActions.includes(false)) {
              hasPermission = false;
            }
          }
        }
      }

      if (hasPermission)
        return true;
    }

    throw new ForbiddenException("You do not have the necessary permission to perform this action");
  }
}
