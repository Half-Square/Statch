/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 14:41:39                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 20:36:55                               *
 *****************************************************************************/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

import {
  ProjectListService,
  ProjectInterface
} from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private api: ApiService,
              private router: Router) {

    this.projects = ProjectListService.projects;
    ProjectListService.projectListChange.subscribe((value) => {
      this.projects = value;
    })
  }

  public projects = new Array<ProjectInterface>

  async openNewProject(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", "projects", {
        name: "New Project",
        description: "My awesome new project"
      }).then((ret: any) => {
        if (ret.id)
          this.router.navigate(["/project/", ret.id ])
        else
          console.error("New Project 1 error >> "+ret)
      }).catch((error: any) => {
        console.error("New project 2 error >> "+error)
      })
    })
  }

  async openNewTask(projectId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", "projects/"+projectId+"/tasks", {
        name: "New Task",
        description: "My awesome new Task"
      }).then((ret: any) => {
        if (ret.id)
          this.router.navigate(["/project/", ret.id ])
        else
          console.error("New Task 1 error >> "+ret)
      }).catch((error: any) => {
        console.error("New Task 2 error >> "+error)
      })
    })
  }

  async openNewTicket(taskId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", "tasks/"+taskId+"/tickets", {
        name: "New Ticket",
        description: "My awesome new ticket"
      }).then((ret: any) => {
        if (ret.id)
          this.router.navigate(["/project/", ret.id ])
        else
          console.error("New Project 1 error >> "+ret)
      }).catch((error: any) => {
        console.error("New project 2 error >> "+error)
      })
    })
  }
}
