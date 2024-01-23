/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-30 15:40:03                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-23 11:34:54                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PermissionsService } from "src/app/services/permissions.service";
/***/

@Component({
  selector: "section-ptt-tool-bar",
  templateUrl: "./ptt-tool-bar.section.html",
  styleUrls: ["./ptt-tool-bar.section.scss"]
})
export class PttToolBarSection {
  @Input() isParentOf: boolean = false;
  @Input() isAssignee: boolean = false;
  @Input() type: string;
  @Input() tabs: {name: string, active: boolean}[];
  @Output() onDelete = new EventEmitter();
  @Output() onCreateChild = new EventEmitter();
  @Output() onAssign = new EventEmitter();
  @Output() switchView = new EventEmitter();

  constructor(public perm: PermissionsService) {}

  public switchTab(index: number): void {
    for (let i = 0; i < this.tabs.length; i++) {
      const element = this.tabs[i];
      if(element === this.tabs[index])
        element.active = true;
      else
        element.active = false;
    }
    this.switchView.emit(this.tabs);
  }
}
