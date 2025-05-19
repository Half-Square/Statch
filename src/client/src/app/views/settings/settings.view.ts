/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-09-28 14:50:46                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2025-05-19 15:44:39                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component } from "@angular/core";
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
    label: "System",
    link: "system",
    admin: true
  }];

  constructor(public user: UserService) {
  }
}
