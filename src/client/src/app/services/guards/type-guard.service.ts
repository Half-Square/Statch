/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-21 12:37:03                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-09-21 12:42:10                              *
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

    const allowedTypes = ["project", "task", "ticket"];
    const typeParam = route.paramMap.get("type");

    if (typeParam && allowedTypes.includes(typeParam)) {
      return true;
    } else {
      this.router.navigateByUrl("/not-found");
      return false;
    }

  }
}
