/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2024-01-12 16:58:25                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-16 19:07:48                               *
 *****************************************************************************/

import { Injectable } from "@angular/core";
import { ToastService } from "./toast.service";
import { UserService } from "./user.service";

export interface IRule {
  type: string,
  actions: string[] | any,
}

export interface IPermissions {
  projects: {
      create: boolean,
      update: {
          assignee: boolean,
          version: boolean,
          status: boolean,
          labels: boolean,
          level: boolean,
          title: boolean,
          description: boolean
      },
      view: boolean,
      delete: boolean,
      assignSelf: boolean,
      comment: {
          create: boolean,
          delete: boolean,
          update: boolean,
          updateSelf: boolean
      }
  },
  tasks: {
      create: boolean,
      update: {
          assignee: boolean,
          version: boolean,
          status: boolean,
          labels: boolean,
          level: boolean,
          title: boolean,
          description: boolean
      },
      view: boolean,
      delete: boolean,
      assignSelf: boolean,
      comment: {
          create: boolean,
          delete: boolean,
          update: boolean,
          updateSelf: boolean
      }
  },
  tickets: {
      create: boolean,
      update: {
          assignee: boolean,
          version: boolean,
          status: boolean,
          labels: boolean,
          level: boolean,
          title: boolean,
          description: boolean
      },
      view: boolean,
      delete: boolean,
      assignSelf: boolean,
      comment: {
          create: boolean,
          delete: boolean,
          update: boolean,
          updateSelf: boolean
      }
  },
  versions: {
      create: boolean
  },
  labels: {
      create: boolean,
      view: boolean,
      update: {
          name: boolean,
          description: boolean
      },
      delete: boolean
  },
  smtp: {
      update: boolean,
      view: boolean
  },
  users: {
      view: boolean,
      update: boolean
  },
  database: {
      view: boolean,
      import: boolean,
      export: boolean
  },
  permissions: {
      view: boolean,
      create: boolean,
      update: boolean,
      delete: boolean
  },
  profile: {
      update: {
          name: boolean,
          email: boolean,
          picture: boolean
      }
  },
  [key: string]: any;
}

@Injectable({
  providedIn: "root"
})
export class PermissionsService {
  private permissions: IPermissions;

  constructor(private user: UserService, private toast: ToastService) {
    const userInfo = this.user.getUser();
    const role: any = userInfo?.role;
    this.permissions = JSON.parse(role.permissions)[0];
  }

  public getPermissions(): IPermissions {
    return this.permissions;
  }

  public check(rule: IRule): boolean {
    // if(this.user.getUser()?.isAdmin)
    //   return true;

    if(!rule)
      return true;

    const typePermissions = this.permissions[rule.type];
    if(typeof typePermissions !== "object" || typePermissions === null)
      return false;

    for(const action of rule.actions) {
      const permission = typePermissions[action];

      if(typeof action !== "string") {
        for(const sAction of action.actions) {

          const sPermission = typePermissions[action.type][sAction];

          if(sPermission === undefined)
            return false;

          if(typeof sPermission === "boolean" && !sPermission) {
            this.toast.print("Permission denied", "warn");
            return false;
          }

          if(typeof sPermission === "boolean" && sPermission) {
            return true;
          }
        }
      }

      if(permission === undefined)
        return false;

      if(typeof permission === "boolean" && !permission) {
        this.toast.print("Permission denied", "warn");
        return false;
      }

      if(typeof permission === "boolean" && permission) {
        return true;
      }
    }
    return false;
  }
}
