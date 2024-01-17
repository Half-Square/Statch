/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2024-01-17 15:25:09                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 19:45:47                               *
 *****************************************************************************/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import * as _ from "lodash";
/***/

/* Interfaces */
import { IPermissions, IRoles, IUsers } from "src/app/interfaces";
/***/

/* Services */
import { PermissionsService } from "src/app/services/permissions.service";
import { RecoveryService } from "src/app/services/recovery.service";
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
import { ToastService } from "src/app/services/toast.service";
/***/

@Component({
  selector: "view-roles",
  templateUrl: "./roles.view.html",
  styleUrls: ["./roles.view.scss"]
})
export class RolesView implements OnInit, OnDestroy {
  public roles: IRoles[];
  public currentRole: IRoles;
  public roleNb: number = 0;
  private sub: Subscription[];
  public editMode: boolean = false;
  public users: IUsers[] = [];

  constructor(private recovery: RecoveryService,
              public perm: PermissionsService,
              private user: UserService,
              private toast: ToastService,
              private api: RequestService) {
  }

  ngOnInit(): void {
    this.sub = [
      this.recovery.get("roles").subscribe((ret) => {
        this.roles = ret;
        this.roleNb = ret.length;
      }),
      this.recovery.get("users").subscribe((users) => this.users = users)
    ];
  }

  ngOnDestroy(): void {
    this.sub.map((s) => s.unsubscribe());
  }

  public selectRole(role: IRoles): void {
    this.currentRole = role;
    this.editMode = true;
  }

  /**
  * Replace assignement by users
  * @return - List of assigned users
  */
  public replaceUsers(): IUsers[] {
    return _.compact(this.currentRole.users!.map((el: IUsers) => {
      return _.find(this.users, { id: el.id });
    }));
  }
  /***/

  public async onItemChange(
    field: string, value: IUsers[] | IPermissions): Promise<void> {
    if(field == "users") {
      let users: any[] = [];
      value.forEach((user: IUsers) => {
        users.push({id: user.id});
      });
      this.currentRole.users = users;
    }
    if(field == "perm")
      this.currentRole.permissions = [value as IPermissions];

    this.saveItem(this.currentRole);
  }

  public saveItem(item: IRoles): void {
    this.api.put(`api/roles/${item.id}`, item, this.user.getUser()?.token)
      .then((ret) => {
        this.roles = ret as IRoles[];
        const index = this.roles.findIndex(role => role.id === item.id);
        this.roles[index] = item;
        this.toast.print(`Role ${item.id} has been saved`, "success");
      });
  }
}
