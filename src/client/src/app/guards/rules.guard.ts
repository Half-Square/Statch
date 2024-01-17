/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2024-01-12 16:20:56                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 14:53:53                               *
 *****************************************************************************/

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { RequestService } from "../services/request.service";
import { ToastService } from "../services/toast.service";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class RulesGuard implements CanActivate{

  constructor(private user: UserService, private toast: ToastService) {}

  canActivate(
    route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const actionsCheck =
        route.data["requiredPermissions"] as { type: string, actions: string[] }[];

      if (!actionsCheck) {
        return resolve(true);
      }

      const user = this.user.getUser();
      const role: any = user?.role;

      if(user?.isAdmin) return true;

      const permissions = JSON.parse(role.permissions)[0];
      let hasPermission = true;

      for (const actionSet of actionsCheck) {
        let elementType = actionSet.type;

        if(elementType === "pttType")
          elementType = route.params["type"];

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
        return resolve(true);
      else {
        this.toast.print("Permission denied", "warn");
        return false;
      }
    });



    // const promises: Promise<boolean>[] = [];

    // roles?.forEach((role: {userId: string, roleId: string}) => {
    //   const promise =
    //   this.api.post(`api/roles/${role.roleId}/check`, requiredPermissions, user?.token)
    //     .then(data => {
    //       return data as boolean;
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       return false;
    //     });

    //   promises.push(promise);
    // });

    // return Promise.all(promises)
    //   .then(perms => {
    //     return perms.some(Boolean) && perms.length > 0;
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     return false;
    //   });
  }

}
