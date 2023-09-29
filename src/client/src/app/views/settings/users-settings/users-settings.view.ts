/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-29 09:34:09                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-29 09:58:08                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import * as _ from "lodash";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
/***/

/* Interfaces */
import { IUsers } from "src/app/interfaces";
import { ToastService } from "src/app/services/toast.service";
/***/

@Component({
  selector: "view-users-settings",
  templateUrl: "./users-settings.view.html",
  styleUrls: ["./users-settings.view.scss"]
})
export class UsersSettingsView implements OnInit, OnDestroy {
  private sub: Subscription;
  public users: IUsers[];

  constructor(private recovery: RecoveryService,
              private api: RequestService,
              private user: UserService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.sub = this.recovery.get("users").subscribe((data) => this.users = data);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
  * Update validate or admin state for user
  * @param id - User to update
  */
  public updateUser(id: string): void {
    this.api.put(
      `api/users/${id}/admin`,
      _.find(this.users, {id: id}),
      this.user.getUser()?.token)
      .then(() => this.toast.print("User updated !", "success"))
      .catch(() => this.toast.print("An error occured, please retry later...", "error"));
  }
  /***/
}
