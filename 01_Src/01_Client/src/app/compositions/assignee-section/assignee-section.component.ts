/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-28 16:26:44                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-30 11:11:50                              *
 ****************************************************************************/

import { Component, EventEmitter, Input, Output, AfterContentChecked } from '@angular/core';
import { UserInterface, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-assignee-section',
  templateUrl: './assignee-section.component.html',
  styleUrls: ['./assignee-section.component.scss']
})
export class AssigneeSectionComponent implements AfterContentChecked {

  constructor() {
    this.user_id = UserService.getUser().id
  }

  @Input() assignees: Array<UserInterface> = []
  @Output() onAssign: EventEmitter<void> = new EventEmitter<void>;

  private user_id: string = "";
  public isAssignee: boolean = false;

  ngAfterContentChecked() {
    this.setAssign()
  }

  public assignMySelf(): void {
    this.onAssign.emit()
  }

  public setAssign() {
    if (this.assignees) {
      for (let i = 0; i < this.assignees.length; i++) {
        if (this.assignees[i].id == this.user_id) {
          this.isAssignee = true;
          return
        }
      }
    }
    this.isAssignee = false;
  }
}
