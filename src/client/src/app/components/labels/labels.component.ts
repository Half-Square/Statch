/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-21 16:47:10                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-28 17:47:48                              *
 ****************************************************************************/

import { Component, Input } from "@angular/core";

@Component({
  selector: "component-labels",
  templateUrl: "./labels.component.html",
  styleUrls: ["./labels.component.scss"]
})
export class LabelsComponent {
  @Input()
    name: string = "";

  @Input()
    color: string;
}
