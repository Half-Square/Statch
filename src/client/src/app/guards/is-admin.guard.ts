/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-28 14:48:37                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-28 14:49:10                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Injectable } from "@angular/core";
/***/

/* Services */
import { UserService } from "../services/user.service";
/***/

@Injectable({
  providedIn: "root"
})
export class IsAdminGuard {
  constructor(private user: UserService) {
  }

  canActivate(): boolean {
    return this.user.isAdmin();
  }
}
