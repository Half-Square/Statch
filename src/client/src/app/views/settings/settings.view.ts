/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-28 14:50:46                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-28 15:00:00                               *
 *****************************************************************************/

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
    label: "Smtp",
    link: "smtp",
    admin: true
  }];

  constructor(public user: UserService) {
  }
}
