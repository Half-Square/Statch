/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-09-13 15:38:37                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-19 13:06:06                               *
 *****************************************************************************/

import { Component, Input } from "@angular/core";

/**
 * Collapse component
 */
@Component({
  selector: "component-collapse",
  templateUrl: "./collapse.component.html",
  styleUrls: ["./collapse.component.scss"]
})
export class CollapseComponent {
  /**
   * Indicates weather the content is show or not.
   */
  @Input() showContent: boolean = false;
}
