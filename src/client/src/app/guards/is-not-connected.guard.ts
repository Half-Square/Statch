/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 18:23:52                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-22 18:56:28                               *
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
export class IsNotConnectedGuard {
  constructor(private router: Router,
              private user: UserService) {
  }
  canActivate(): boolean | UrlTree {
    if (this.user.getUser()) this.router.navigateByUrl("/projects");
    return true;
  }
}
