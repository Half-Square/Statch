/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-15 15:36:37                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-29 12:29:04                              *
 ****************************************************************************/

import { Component, Input, OnInit } from "@angular/core";

/**
 * Status component
 */
@Component({
  selector: "component-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.scss"]
})
export class StatusComponent implements OnInit {
  /**
   * The state of an element.
   */
  @Input()
    status: "new" | "progress" | "done" | "reject" | "wait" | string | null = "new";

  /**
   * Size of the status component
   */
  @Input()
    size: "small" | "medium" = "medium";

  /**
   * Label text of component.
   */
  public label: "New" | "In progress" | "Completed" |"Rejected" |"Pending" = "New";

  /**
   * Switch case of status component.
   */
  ngOnInit(): void {
    switch (this.status) {
    case "new":
      this.label = "New";
      break;
    case "progress":
      this.label = "In progress";
      break;
    case "done":
      this.label = "Completed";
      break;
    case "reject":
      this.label = "Rejected";
      break;
    case "wait":
      this.label = "Pending";
      break;
    }
  }
}
