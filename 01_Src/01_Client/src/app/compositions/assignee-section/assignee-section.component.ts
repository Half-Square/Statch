/******************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-28 16:26:44                               *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-28 17:55:11                               *
 *****************************************************************************/

import { Component, EventEmitter, Input, Output, AfterContentChecked } from '@angular/core';
import { UserInterface, UserService } from 'src/app/services/user/user.service';

import {
  ProjectListService
} from 'src/app/services/project-list/project-list.service';

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
    console.log(this.assignees);

    if (this.assignees)
      for (let i = 0; i < this.assignees.length; i++) {
        if (this.assignees[i].id == this.user_id) {
          this.isAssignee = true;
          return
        }
      }
      this.isAssignee = false;
  }
}
