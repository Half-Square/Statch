/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2024-01-12 16:58:25                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-12 17:17:25                               *
 *****************************************************************************/

import { Injectable } from "@angular/core";
import { RequestService } from "./request.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class PermissionsService {

  constructor(private user: UserService, private api: RequestService) {}

  public check(
    requiredPermissions: { entity: string, action: string[] }[]): Promise<boolean> {

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
