/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-28 14:50:46                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2024-01-31 17:23:09                              *
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
  }];

  constructor(public user: UserService) {
  }
}
