/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-17 14:41:39                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-11 16:52:43                               *
 *****************************************************************************/

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

  constructor(private router: Router,
              public command: CommandService) {
    this.initData();
    this.subscribeEvent();
  }

  public projects = new Array<ProjectInterface>;
  public projectList = new Array<ProjectInterface>;

  public url: Array<string> = [];

  public projectId: string = "";
  public taskId: string = "";
  public ticketId: string = "";
  public activities: number = 3;

  /**
  * @name initData
  * @descr Init data from project list service
  *
  */
  private initData():void {
    this.url = this.router.url.split("/")
    this.projectList = ProjectListService.projects
    this.projectId = ProjectListService.projectId
    this.taskId = ProjectListService.taskId
    this.ticketId = ProjectListService.ticketId
    this.getProjects()
  }
  /***/

  /**
  * @name subscribeEvent
  * @descr subscribe to router and Project List events
  *
  */
  private subscribeEvent():void {
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.handleNavigation(val)
      }
    });
    ProjectListService.projectListChange
    .subscribe((value: Array<ProjectInterface>) => {
      this.projectList = value;
      this.getProjects()
    })
    ProjectListService.projectChange
    .subscribe((project: ProjectInterface) => {
      this.projectId = project.id;
      this.taskId = "";
      this.ticketId = "";
    })
    ProjectListService.taskChange
    .subscribe((task: TaskInterface) => {
      this.projectId = task.projectId;
      this.taskId = task.id;
      this.ticketId = "";
    })
    ProjectListService.ticketChange
    .subscribe((ticket: TicketInterface) => {
      this.taskId = ticket.taskId;
      this.ticketId = ticket.id;
    })
    ProjectListService.actualChange
    .subscribe(() => {
      this.getProjects()
    })
  }
  /***/

  /**
  * @name handleNavigation
  * @descr set url after navigation
  *
  */
  private handleNavigation(navEnd: NavigationEnd): void {
    this.url = navEnd.urlAfterRedirects.split("/");
  }
  /***/

  /**
  * @name getProjects
  * @descr set projects as a single or an array of projects from url
  *
  */
  private getProjects(): void {
    if ((this.url[1] == 'project' ||
        this.url[1] == 'task' ||
        this.url[1] == 'ticket') &&
        this.projectId) {
      for (let i = 0; i < this.projectList.length; i++) {
        if (this.projectId == this.projectList[i].id) {
          this.projects = [ this.projectList[i] ];
        }
      }
    } else {
      this.projects = this.projectList;
      this.projectId = "";
      this.taskId = "";
      this.ticketId = "";
    }
  }
  /***/


  /**
  * @name getProjects
  * @descr set projects as a single or an array of projects from url
  *
  */
  public openNew(): void {
    if (this.url[1] == 'project' && this.projectId) {
      this.command.openNewTask(this.projectId)
    } else if ((this.url[1] == 'task' || this.url[1] == 'ticket') && this.taskId) {
      this.command.openNewTicket(this.taskId)
    } else {
      this.command.openNewProject()
    }
  }
  /***/
}
