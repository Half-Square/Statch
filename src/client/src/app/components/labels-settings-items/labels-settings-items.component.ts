/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-28 16:18:12                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-17 14:46:13                              *
 ****************************************************************************/

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
import { PermissionsService } from "src/app/services/permissions.service";
/***/

@Component({
  selector: "component-labels-settings-items",
  templateUrl: "./labels-settings-items.component.html",
  styleUrls: ["./labels-settings-items.component.scss"]
})
export class LabelsSettingsItemsComponent {
  @Input() label: ILabels;
  public old: ILabels;
  public onEdit: boolean = false;

  constructor(private api: RequestService,
              private user: UserService,
              public perm: PermissionsService) {
  }

  /**
  * Remove label
  */
  remove(): void {
    this.api.delete(`api/labels/${this.label.id}`, this.user.getUser()?.token);
  }
  /***/

  /**
  * Enable edit mode
  */
  public enableEditMode(): void {
    this.old = {...this.label};
    this.onEdit = true;
  }
  /***/

  /**
  * Revert label update
  */
  public revert(): void {
    this.label = {...this.old};
    this.onEdit = false;
  }
  /***/

  /**
  * Save change
  */
  public save(): void {
    this.api.put(`api/labels/${this.label.id}`, this.label, this.user.getUser()?.token);
  }
  /***/
}
