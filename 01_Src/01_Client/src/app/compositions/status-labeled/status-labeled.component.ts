/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 13:16:59                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-24 15:44:51                              *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-status-labeled',
  templateUrl: './status-labeled.component.html',
  styleUrls: ['./status-labeled.component.scss']
})
export class StatusLabeledComponent implements AfterContentChecked {
  @Input() status: string = "";
  @Output() statusChange: EventEmitter<string> = new EventEmitter<string>;

  @Input() isEdit: boolean = false;

  public value: {text: string, icon?: string} = {text: "New", icon: "new"}

  ngAfterContentChecked() {
    for (let i = 0; i < this.statusList.length; i++) {
      if (this.statusList[i].icon == this.status)
        this.value = this.statusList[i]
    }
  }

  public statusList: Array<{text: string, icon: string}> = [
    {text: "New", icon: "new"},
    {text: "In progress", icon: "progress"},
    {text: "Completed", icon: "done"},
    {text: "Rejected", icon: "reject"},
    {text: "Pending", icon: "wait"}
  ];
}
