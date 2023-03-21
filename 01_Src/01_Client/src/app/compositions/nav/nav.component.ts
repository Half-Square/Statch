/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 14:41:39                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-21 14:55:44                              *
 ****************************************************************************/

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { CommandService } from 'src/app/services/command/command.service';

import {
  ProjectListService,
  ProjectInterface,
  TaskInterface,
  TicketInterface
} from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private api: ApiService,
              private router: Router,
              public command: CommandService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.handleNavigation(val)
      }
    });
    ProjectListService.projectListChange
    .subscribe((value: Array<ProjectInterface>) => {
      console.log("projectListChange");

      this.projectList = value;
      this.getProjects()
    })
    ProjectListService.projectChange
    .subscribe((project: ProjectInterface) => {
      console.log("projectChange");

      this.projectId = project.id;
      this.taskId = "";
      this.ticketId = "";
      this.getProjects()
    })
    ProjectListService.taskChange
    .subscribe((task: TaskInterface) => {
      console.log("taskChange");

      this.projectId = task.projectId;
      this.taskId = task.id;
      this.ticketId = "";
    })
    ProjectListService.ticketChange
    .subscribe((ticket: TicketInterface) => {
      console.log("ticketChange");
      this.taskId = ticket.taskId;
      this.ticketId = ticket.id;
    })
  }

  public projects = new Array<ProjectInterface>;
  public projectList = new Array<ProjectInterface>;

  public url: Array<string> = [];

  public projectId: string = "";
  public taskId: string = "";
  public ticketId: string = "";

  private handleNavigation(navEnd: NavigationEnd): void {
    this.url = navEnd.urlAfterRedirects.split("/");
  }

  private getProjects(): void {
    if (this.url[1] == 'project' ||
        this.url[1] == 'task' ||
        this.url[1] == 'ticket') {
      if (this.projectId) {
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectId == this.projectList[i].id) {
            this.projects = [ this.projectList[i] ];
          }
        }
      } else {
        this.projects = this.projectList;
      }
    } else {
      this.projects = this.projectList;
      this.projectId = "";
      this.taskId = "";
      this.ticketId = "";
    }
  };
}
