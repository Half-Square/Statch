/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-24 15:14:47                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-29 20:31:46                              *
 ****************************************************************************/

import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { CommandService } from 'src/app/services/command/command.service';

import {
  ProjectListService,
  ProjectInterface,
  TaskInterface,
  TicketInterface
} from 'src/app/services/project-list/project-list.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  constructor(private router: Router,
              public command: CommandService) {
  }
  public projectId: string = "";
  public taskId: string = "";
  public ticketId: string = "";

  public projects = new Array<ProjectInterface>;
  public open: boolean = false;

  public showCollapse: boolean = false;
  public isInit: boolean = false;

  @Input() isOpen: boolean = false;
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>;

  async ngOnInit() {
    this.projects = await this.command.getMyProject()
      console.log("this.projects", this.projects);
  }

  /**
  * @name toggleCollapse
  * @descr Close / Open collapse
  *
  *
  */
  public toggleCollapse(): void {
    this.isInit = true;

    this.showCollapse = !this.showCollapse;
    if (this.showCollapse)
      this.onOpen.emit();
  }
  /***/

  /**
  * @name show
  * @descr return showCollapse if the component is init else isOpen
  *
  * @returns boolean
  */
  public show(): boolean {
    if (this.isInit)
      return this.showCollapse
    return this.showCollapse = this.isOpen
  }
  /***/

  public getTasks(projectId: string) {
    console.log("projectId", projectId);
    this.command.getMyTask(projectId)
    .then((tasks: Array<TaskInterface>) => {
      if (tasks.length > 0)
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].id == projectId) {
            this.projects[i].tasks = tasks
            return
          }
        }
    })
  }

  public getTickets(taskId: string) {
    this.command.getMyTicket(taskId)
    .then((tickets: Array<TicketInterface>) => {
      if (tickets.length > 0)
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].tasks) {
            let tasks = this.projects[i].tasks;
            for (let j = 0; j < tasks.length; j++) {
              if (tasks[j].id == taskId) {
                tasks[j].tickets = tickets
                return
              }
            }
          }
        }
    })
  }
}

