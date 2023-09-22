/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 18:23:52                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-22 18:25:03                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
/***/

@Injectable({
  providedIn: "root"
})
export class IsNotConnectedGuard {
  constructor(private router: Router) {
  }
  canActivate(): boolean | UrlTree {
    let session = localStorage.getItem("user");

    if (session) this.router.navigateByUrl("/home");
    return true;
  }
}
