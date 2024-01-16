/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-28 16:23:37                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-16 19:13:48                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
  * Create new label
*/

/* Imports */
import { Component, Input } from "@angular/core";
/***/

/* Interfaces */
import { ILabels } from "src/app/interfaces";
import { PermissionsService } from "src/app/services/permissions.service";
import { RequestService } from "src/app/services/request.service";
/***/

/* Services */
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "section-labels-editor",
  templateUrl: "./labels-editor.section.html",
  styleUrls: ["./labels-editor.section.scss"]
})
export class LabelsEditorSection {
  @Input() labels: ILabels[] = [];
  public nLabel: {name: string, description: string, color: string} = {
    name: "",
    description: "",
    color: "#f9f9f9"
  };

  constructor(private user: UserService,
              private api: RequestService,
              public perm: PermissionsService) {
  }

  /**
  * Create new label
  */
  public createLabel(): void {
    this.api.post(`api/labels`, this.nLabel, this.user.getUser()?.token);
    this.nLabel = {name: "", description: "", color: "#f9f9f9"};
  }
  /***/
}
