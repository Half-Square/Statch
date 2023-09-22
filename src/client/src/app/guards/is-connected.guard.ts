/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 18:17:29                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-22 18:21:25                               *
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
export class IsConnectedGuard {
  constructor(private router: Router) {
  }

  canActivate(): boolean | UrlTree {
    let session = localStorage.getItem("user");

    if (!session) this.router.navigateByUrl("/login");
    return true;
  }
}

