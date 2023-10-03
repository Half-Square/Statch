/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-29 12:23:43                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-29 12:36:53                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
*/

/* Imports */
import { Component, Input } from "@angular/core";
/***/

/* Interfaces */
import { IActivities } from "src/app/interfaces";
/***/

@Component({
  selector: "component-activity-action-state",
  templateUrl: "./activity-action-state.component.html",
  styleUrls: ["./activity-action-state.component.scss"]
})
export class ActivityActionStateComponent {
  @Input() activity: IActivities;
  @Input() state: string;
}
