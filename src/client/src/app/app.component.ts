/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-30 11:58:04                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-11-14 10:21:00                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component } from "@angular/core";
import { environment as env } from "./../environments/environment";
/***/

/* Services */
import { UserService } from "./services/user.service";
import { NavService } from "./sections/navigation/nav.service";
/***/

/* Interfaces */
import { Router } from "@angular/router";
/***/

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public onSearch: boolean = false;

  constructor(public user: UserService,
              public nav: NavService,
              private router: Router) {
    if (env.production) { // Recover system settings, only for production
      fetch("/api/settings/sys", {headers: {"Content-Type": "application/json"}})
        .then((ret) => {
          ret.json()
            .then((json) => {
              if (json.api && json.host && json.socket) {
                env.serverUrl = `http://${json["host"]}:${json["api"]}`;
                env.socketUrl = `http://${json["host"]}:${json["socket"]}`;
                if (json.demo) {
                  this.user.setUser(json.demo);
                  this.router.navigate(["/"]);
                }
              } else this.router.navigate(["/first-launch"]);
            });
        });
    }
  }
}
