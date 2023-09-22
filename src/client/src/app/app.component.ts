/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-30 11:58:04                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-22 16:57:03                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { environment as env } from "./../environments/environment";
/***/

/* Services */
import { RecoveryService } from "./services/recovery.service";
import { UserService } from "./services/user.service";
/***/

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private recovery: RecoveryService,
              public user: UserService) {
  }

  ngOnInit(): void {
    this.recovery.init({
      apiUrl: `${env.serverUrl}/api`,
      socketUrl: env.socketUrl
    });
  }
}
