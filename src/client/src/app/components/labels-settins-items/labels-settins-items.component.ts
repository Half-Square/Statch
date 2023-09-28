/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-28 16:18:12                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-28 16:29:25                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
*/

/* Imports */
import { Component, Input } from "@angular/core";
/***/

/* Interfaces */
import { ILabels } from "src/app/interfaces";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "component-labels-settins-items",
  templateUrl: "./labels-settins-items.component.html",
  styleUrls: ["./labels-settins-items.component.scss"]
})
export class LabelsSettinsItemsComponent {
  @Input() label: ILabels;

  constructor(private api: RequestService,
              private user: UserService) {
  }

  /**
  * Remove label
  */
  remove(): void {
    this.api.delete(`api/labels/${this.label.id}`, this.user.getUser()?.token);
  }
  /***/
}
