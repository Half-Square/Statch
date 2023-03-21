/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 13:16:59                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-21 19:27:24                              *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-labeled',
  templateUrl: './status-labeled.component.html',
  styleUrls: ['./status-labeled.component.scss']
})
export class StatusLabeledComponent {
  @Input() status: string = "";
  @Output() statusChange: EventEmitter<string> = new EventEmitter<string>;

  @Input() isEdit: boolean = false;

  public statusList = [{
    name: "Done",
    value: "done"
  }, {
    name: "New",
    value: "new"
  }, {
    name: "Reject",
    value: "reject"
  }, {
    name: "Wait",
    value: "wait"
  }, {
    name: "Progress",
    value: "progress"
  }]
}
