/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-30 11:58:04                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-20 16:41:20                              *
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
/***/

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private recovery: RecoveryService) {
  }

  ngOnInit(): void {
    this.recovery.init({
      apiUrl: `${env.serverUrl}/api`,
      socketUrl: env.socketUrl
    });
  }
}
