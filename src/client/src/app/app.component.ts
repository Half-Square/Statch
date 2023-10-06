/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-30 11:58:04                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-06 12:17:58                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { environment as env } from "./../environments/environment";
import * as _ from "lodash";
/***/

/* Services */
import { RecoveryService } from "./services/recovery.service";
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
export class AppComponent implements OnInit {
  public onSearch: boolean = false;

  constructor(private recovery: RecoveryService,
              public user: UserService,
              public nav: NavService,
              private router: Router) {
    if (!env.dev) { // Recover system settings, only for production
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

  ngOnInit(): void {
    this.recovery.init({
      apiUrl: `${env.serverUrl}/api`,
      socketUrl: env.socketUrl
    });
  }
}
