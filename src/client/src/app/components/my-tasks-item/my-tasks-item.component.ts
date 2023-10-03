/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-25 17:24:48                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-25 17:49:50                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Toggle open status
*/

/* Imports */
import { Component, EventEmitter, Input, Output } from "@angular/core";
/***/

@Component({
  selector: "component-my-tasks-item",
  templateUrl: "./my-tasks-item.component.html",
  styleUrls: ["./my-tasks-item.component.scss"]
})
export class MyTasksItemComponent {
  @Input() name: string;
  @Input() status: string;
  @Input() created: string;
  @Input() level: string;
  @Input() link: string;
  @Input() opennable: boolean;
  @Input() isOpen: boolean = false;
  @Output() onToggle = new EventEmitter();

  /**
  * Toggle open status
  */
  public toggleOpen(): void {
    this.onToggle.emit();
  }
  /***/
}
