/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 22:34:38                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-18 16:01:27                               *
 *****************************************************************************/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { ProjectListService, TaskInterface, TicketInterface } from '../project-list/project-list.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private api: ApiService,
              private router: Router) { }

  async openNewProject(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", "projects", {
        name: "New Project",
        description: "My awesome new project"
      }).then((ret: any) => {
        ProjectListService.addProject(ret);
        this.router.navigate(["/project/", ret.id ])
      }).catch((error: any) => {
        console.error("New project error >> "+error)
      })
    })
  }

  async openNewTask(projectId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", "projects/"+projectId+"/tasks", {
        name: "New Task",
        description: "My awesome new Task"
      }).then((ret: any) => {
        ProjectListService.addTask(ret.projectId, ret);
        this.router.navigate(["/task/", ret.id ])
      }).catch((error: any) => {
        console.error("New Task error >> "+error)
      })
    })
  }

  async openNewTicket(projectId: string, taskId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", "tasks/"+taskId+"/tickets", {
        name: "New Ticket",
        description: "My awesome new ticket"
      }).then((ret: any) => {
        ProjectListService.addTicket(taskId, ret);
        this.router.navigate(["/ticket/", ret.id ])
      }).catch((error: any) => {
        console.error("New project 2 error >> "+error)
      })
    })
  }

  async deleteProject(projectId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("DELETE", "projects/"+projectId, {})
      .then((ret: any) => {
        ProjectListService.removeProject(projectId);
        this.router.navigate(["/projects"])
      }).catch((error: any) => {
        console.error("New project error >> "+error)
      })
    })
  }

  async deleteTask(task: TaskInterface): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("DELETE", "tasks/"+task.id, {})
      .then((ret: any) => {

        ProjectListService.removeTask(task.projectId, task.id);
        this.router.navigate(["/project/", task.projectId ])
      }).catch((error: any) => {
        console.error("New Task error >> "+error)
      })
    })
  }

  async deleteTicket(projectId: string, ticket: TicketInterface): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("DELETE", "tickets/"+ticket.id, {})
      .then((ret: any) => {
        ProjectListService.removeTicket(projectId, ticket.taskId, ticket.id);
        this.router.navigate(["/task/", ticket.taskId ])
      }).catch((error: any) => {
        console.error("New project 2 error >> "+error)
      })
    })
  }
}
