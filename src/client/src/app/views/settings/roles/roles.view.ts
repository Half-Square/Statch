/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2024-01-17 15:25:09                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-19 15:49:25                               *
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
  public currentPerm: any;
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

  /**
   * Set current role
   * @param role role's data
   */
  public selectRole(role: IRoles): void {
    this.currentRole = role;
    this.currentPerm = JSON.parse(role.permissions)[0];
    this.editMode = true;
  }
  /***/

  /**
  * Replace assignement by users
  * @return - List of assigned users
  */
  public replaceUsers(): IUsers[] {
    return _.compact(this.currentRole.users?.map((el: IUsers) => {
      return _.find(this.users, { id: el.id });
    }));
  }
  /***/

  /**
   * Update data when some data change
   * @param field Type of item who change
   * @param value Item's data
   */
  public async onItemChange(
    field: string, value: IUsers[] | IPermissions): Promise<void> {
    if(field == "users") {
      let users: any[] = [];
      (value as IUsers[]).forEach((user: IUsers) => {
        users.push({id: user.id});
      });
      this.currentRole.users = users;
    }

    if(field == "perm")
      this.currentRole.permissions = JSON.stringify([value as IPermissions]);

    this.saveItem();
  }
  /***/

  /**
   * Save item to the server
   * @param item Role's data
   */
  public saveItem(): void {
    let users: any[] = [];
    (this.currentRole.users as IUsers[]).forEach((user: IUsers) => {
      users.push({id: user.id});
    });
    this.currentRole.users = users;
    this.currentRole.name = this.currentRole.name.toLocaleLowerCase();

    this.api.put(
      `api/roles/${this.currentRole.id}`,
      this.currentRole,
      this.user.getUser()?.token
    )
      .then((ret) => {
        this.roles = ret as IRoles[];
        const index = this.roles.findIndex(role => role.id === this.currentRole.id);
        this.roles[index] = this.currentRole;
        this.currentRole = this.currentRole;
        this.toast.print(`Role ${this.currentRole.id} has been saved`, "success");
      });
  }
  /***/

  /**
  * Save item on press enter
  */
  public saveEnter(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.saveItem();
    }
  }
  /***/

  /**
   * Delete current role
   */
  public deleteRole(): void {
    this.api.delete("api/roles/" + this.currentRole.id, this.user.getUser()?.token).then(() => {
      this.editMode = false;
    });
  }
  /***/

  /**
   * Create new role
   */
  public create(): void {
    const newRole = {
      name: "Role" + this.roles.length,
      default: true,
      permissions: [{
        projects: {
          create: false,
          update: {
            view: true,
            assignee: false,
            version: false,
            status: false,
            labels: false,
            level: false,
            title: false,
            description: false
          },
          view: true,
          delete: false,
          assignSelf: true,
          comment: {
            view: true,
            create: true,
            delete: false,
            update: false,
            updateSelf: false
          }
        },
        tasks: {
          create: false,
          update: {
            view: true,
            assignee: false,
            version: false,
            status: false,
            labels: false,
            level: false,
            title: false,
            description: false
          },
          view: true,
          delete: false,
          assignSelf: true,
          comment: {
            view: true,
            create: true,
            delete: false,
            update: false,
            updateSelf: false
          }
        },
        tickets: {
          create: false,
          update: {
            view: true,
            assignee: false,
            version: false,
            status: false,
            labels: false,
            level: false,
            title: false,
            description: false
          },
          view: true,
          delete: false,
          assignSelf: true,
          comment: {
            view: true,
            create: false,
            delete: false,
            update: false,
            updateSelf: false
          }
        },
        versions: {
          view: true,
          create: false
        },
        labels: {
          create: false,
          view: true,
          update: {
            view: true,
            name: false,
            description: false
          },
          delete: false
        },
        smtp: {
          update: false,
          view: false
        },
        users: {
          view: false,
          update: false
        },
        database: {
          view: false,
          import: false,
          export: false
        },
        permissions: {
          view: false,
          create: false,
          update: false,
          delete: false
        },
        profile: {
          view: true,
          update: {
            view: true,
            name: true,
            email: false,
            picture: false
          }
        }
      }]
    };

    this.api.post("api/roles", newRole, this.user.getUser()?.token).then((ret) => {
      this.selectRole(ret as IRoles);
    });
  }
  /***/
}
