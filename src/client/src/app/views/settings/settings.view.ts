/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-28 14:50:46                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-17 15:02:04                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component } from "@angular/core";
import { PermissionsService } from "src/app/services/permissions.service";
/***/

/* Services */
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "view-settings",
  templateUrl: "./settings.view.html",
  styleUrls: ["./settings.view.scss"]
})
export class SettingsView {
  public menu: {label: string, link: string, admin: boolean}[] = [{
    label: "Labels",
    link: "labels",
    admin: false
  }, {
    label: "Smtp",
    link: "smtp",
    admin: true
  }, {
    label: "Users",
    link: "users",
    admin: true
  }, {
    label: "Database",
    link: "database",
    admin: true
  }, {
    label: "Roles",
    link: "roles",
    admin: true
  }];

  constructor(public user: UserService,
              public perm: PermissionsService) {
  }
}
