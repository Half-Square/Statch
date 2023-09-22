/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 18:17:29                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-22 18:35:59                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
/***/

/* Services */
import { UserService } from "../services/user.service";
/***/

@Injectable({
  providedIn: "root"
})
export class IsConnectedGuard {
  constructor(private router: Router,
              private user: UserService) {
  }

  canActivate(): boolean | UrlTree {
    if (!this.user.isConnected()) this.router.navigateByUrl("/login");
    return true;
  }
}

