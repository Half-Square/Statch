/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-28 16:38:24                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-28 17:46:33                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
*/

/* Imports */
import { Component, EventEmitter, Input, Output } from "@angular/core";
/***/

/* Interfaces */
interface IEditLabel {
  id?: string,
  name: string,
  description: string,
  color: string
}
/***/

@Component({
  selector: "component-labels-edit",
  templateUrl: "./labels-edit.component.html",
  styleUrls: ["./labels-edit.component.scss"]
})
export class LabelsEditComponent {
  @Input() label: IEditLabel;
  @Output() labelChange = new EventEmitter();
  @Output() callback = new EventEmitter();
}
