/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2024-01-12 16:58:25                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-15 13:36:33                               *
 *****************************************************************************/

import { Injectable } from "@angular/core";
import { RequestService } from "./request.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class PermissionsService {

  constructor(private user: UserService, private api: RequestService) {}

  public async check(
    requiredPermissions: { entity: string, action: string[] }[]): Promise<boolean> {
    return new Promise<boolean>(async(resolve, reject) => {
      const user = this.user.getUser();
      const roles: any = user?.roles;

      // if(user?.isAdmin) return true;

      const results: boolean[] = [];

      for (const role of roles || []) {
        await this.api.post(
          `api/roles/${role.roleId}/check`,
          requiredPermissions,
          user?.token
        ).then((data) => {
          results.push(data as boolean);
        }).catch(err => {
          console.error(err);
          results.push(false);
        });
      }

      return resolve(results.some(Boolean));
    });
  }
}
