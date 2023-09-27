/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-27 16:43:25                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-27 16:51:41                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component, EventEmitter, Output } from "@angular/core";
/***/

/* Services */
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "component-menu-options",
  templateUrl: "./menu-options.component.html",
  styleUrls: ["./menu-options.component.scss"]
})
export class MenuOptionsComponent {
  @Output() onClose = new EventEmitter<void>();

  constructor(public user: UserService) {
  }
}
