/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-09-21 16:47:10                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-09-21 16:47:10                               *
 *****************************************************************************/

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
    color: "white" | "yellow" | "green" | "red" | "blue" | "purple" = "white";
}
