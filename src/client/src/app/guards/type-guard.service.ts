/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-21 12:37:03                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-22 19:00:32                              *
 ****************************************************************************/

import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

/**
 * Router Guard redirect to 404 if not allowew types.
 */
@Injectable({
  providedIn: "root"
})
export class TypeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const allowedTypes = ["projects", "tasks", "tickets"];
    const typeParam = route.paramMap.get("type");

    if (typeParam && allowedTypes.includes(typeParam)) {
      return true;
    } else {
      this.router.navigateByUrl("/not-found");
      return false;
    }

  }
}
