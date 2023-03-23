/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 13:16:59                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-22 16:16:16                              *
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
    name: "New",
    value: "new"
  }, {
    name: "Done",
    value: "done"
  }, {
    name: "In progress",
    value: "progress"
  }, {
    name: "Wait",
    value: "wait"
  }, {
    name: "Rejected",
    value: "reject"
  }]
}
