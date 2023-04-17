/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-28 16:26:44                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-15 17:41:02                               *
 *****************************************************************************/

import { Component, EventEmitter, Input, Output, AfterContentChecked, ElementRef, ViewChild } from '@angular/core';
import { UserInterface, UserService } from 'src/app/services/user/user.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ProjectInterface, TaskInterface, TicketInterface } from 'src/app/services/project-list/project-list.service';
import { CommandService } from 'src/app/services/command/command.service';
import { ApiService } from 'src/app/services/api/api.service';
import { FunctionService } from 'src/app/services/function/function.service';

@Component({
  selector: 'app-assignee-section',
  templateUrl: './assignee-section.component.html',
  styleUrls: ['./assignee-section.component.scss'],
  animations: [
    trigger('nested', [
      transition(':enter', [
        animate('100ms 100ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms 100ms ease-in-out', style({ opacity: 0, transform: "translateY(-16px)" }))
      ])
    ])
  ]
})
export class AssigneeSectionComponent implements AfterContentChecked {

  constructor(private command: CommandService,
              private api: ApiService,
              private func: FunctionService) {
    this.user_id = UserService.getUser().id
    this.api.request("GET", "users")
    .then((ret: Array<UserInterface>) => {
      this.userList = ret;
    })

  }

  @Input() data: ProjectInterface | TaskInterface | TicketInterface | null = null;
  @Input() dataType: string = "";

  @Input() assignees: Array<UserInterface> = []

  private user_id: string = "";

  public userList: Array<UserInterface> = []
  public nonAssigned: Array<UserInterface> = []

  public isAssignee: boolean = false;
  public showOption: boolean = false;

  ngAfterContentChecked() {
    this.setAssign();
  }

  toggleOption() {
    this.showOption = !this.showOption;
  }

  public assignMySelf(): void {
    if (this.data)
      this.command.assignMySelf(this.dataType, this.data);
  }

  public unassignMySelf(): void {
    if (this.data)
      this.command.unassignMySelf(this.dataType, this.data);
  }

  public assignSomeOne(user: UserInterface): void {
    if (this.data)
      this.command.assignSomeOne(this.dataType, this.data, user);
  }

  public unassignSomeOne(user: UserInterface): void {
    if (this.data)
      this.command.unassignSomeOne(this.dataType, this.data, user);
  }

  public setAssign() {
    if (this.assignees) {
      this.nonAssigned = this.userList.filter(el =>{
        return this.assignees.every((f) => {
          return f.id !== el.id;
        });
      })
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
