/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-28 16:26:44                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-31 16:27:30                              *
 ****************************************************************************/

import { Component, EventEmitter, Input, Output, AfterContentChecked } from '@angular/core';
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
              private api: ApiService) {
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
    this.setAssign()
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
          return el.id === this.user_id ? false : f.id !== el.id;
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
