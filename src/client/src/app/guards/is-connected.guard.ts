/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-22 18:17:29                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-11-14 10:20:23                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { environment as env } from "src/environments/environment";
/***/

/* Services */
import { UserService } from "../services/user.service";
import { RecoveryService } from "../services/recovery.service";
/***/

@Injectable({
  providedIn: "root"
})
export class IsConnectedGuard {
  constructor(private router: Router,
              private user: UserService,
              private recovery: RecoveryService) {
  }

  canActivate(): boolean | UrlTree {
    if (!this.user.getUser()) this.router.navigateByUrl("/login");
    else {
      this.recovery.init({
        apiUrl: `${env.serverUrl}/api`,
        socketUrl: env.socketUrl
      });
    }
    return true;
  }
}

