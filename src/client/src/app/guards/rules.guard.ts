/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2024-01-12 16:20:56                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-12 16:39:50                               *
 *****************************************************************************/

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { RequestService } from "../services/request.service";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class RulesGuard implements CanActivate{

  constructor(private user: UserService, private api: RequestService) {}

  canActivate(
    route: ActivatedRouteSnapshot): Promise<boolean> {

    const requiredPermissions =
      route.data["requiredPermissions"] as { entity: string, action: string[] }[];

    const user = this.user.getUser();
    const roles: any = user?.roles;

    // if(user?.isAdmin) return true;

    const promises: Promise<boolean>[] = [];

    roles?.forEach((role: {userId: string, roleId: string}) => {
      const promise =
      this.api.post(`api/roles/${role.roleId}/check`, requiredPermissions, user?.token)
        .then(data => {
          return data as boolean;
        })
        .catch(error => {
          console.error(error);
          return false;
        });

      promises.push(promise);
    });

    return Promise.all(promises)
      .then(perms => {
        return perms.some(Boolean) && perms.length > 0;
      })
      .catch(error => {
        console.error(error);
        return false;
      });
  }

}
