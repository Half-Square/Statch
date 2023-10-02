/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-30 15:40:03                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-02 15:27:31                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component, EventEmitter, Input, Output } from "@angular/core";
/***/

@Component({
  selector: "section-ptt-tool-bar",
  templateUrl: "./ptt-tool-bar.section.html",
  styleUrls: ["./ptt-tool-bar.section.scss"]
})
export class PttToolBarSection {
  @Input() isParentOf: boolean = false;
  @Input() isAssignee: boolean = false;
  @Output() onDelete = new EventEmitter();
  @Output() onCreateChild = new EventEmitter();
  @Output() onAssign = new EventEmitter();
}
