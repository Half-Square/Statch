/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 14:25:08                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-21 14:35:58                              *
 ****************************************************************************/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {
  private static projectList: Array<ProjectInterface> = new Array<ProjectInterface>;

  public static projectListChange:
    Subject<Array<ProjectInterface>> = new Subject<Array<ProjectInterface>>();

  public static projectChange:
    Subject<ProjectInterface> = new Subject<ProjectInterface>();

  public static taskChange:
    Subject<TaskInterface> = new Subject<TaskInterface>();

  public static ticketChange:
    Subject<TicketInterface> = new Subject<TicketInterface>();

  public static isProjectInit(projectId: string): boolean {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].id == projectId) {
        if (this.projectList[i].tasks && this.projectList[i].tasks.length > 0)
          return true;
        else
          return false;
      }
    }
    return false;
  }

  public static isTaskInit(taskId: string): boolean {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].tasks) {
        for (let j = 0; j < this.projectList[i].tasks.length; j++) {
          let task = this.projectList[i].tasks[j];
          if (task.id == taskId) {
            if (task.tickets && task.tickets.length > 0)
              return true;
            else
              return false;
          }
        }
      }
    }
    return false;
  }

  /**
  * @name addProjectList
  * @descr updating projectList by merging new data in old
  *        then emit projectListChange
  *
  * @param ret(Array<ProjectInterface>): new project list
  */
  public static addProjectList(ret: Array<ProjectInterface>): void {
    let map: any = {};
    ret.forEach((newProject) => {
      let change = false;
      this.projectList.forEach((project) => {
        if (project["id"] == newProject["id"]) {
          map[project["id"]] = Object.assign(project, newProject)
          change = true;
        }
      });
      if (!change)
        map[newProject["id"]] = newProject;
    });
    this.projectList = Object.values(map);
    this.projectListChange.next(this.projectList);
  }
  /***/

  /**
  * @name addProject
  * @descr updating projectList by updating or adding a project
  *        then emit projectListChange
  *
  * @param newProject (ProjectInterface): project to update or add
  */
  public static addProject(newProject:ProjectInterface, willEmit: boolean = true): void {
    let changed = false

    this.projectList.forEach(project => {
      if (project.id == newProject.id) {
        if ((!newProject.tasks || newProject.tasks.length < 1) && project.tasks)
          newProject.tasks = project.tasks;
        if (newProject.tasks && newProject.tasks.length > 0 &&
          project.tasks && project.tasks.length > 0) {
            project.tasks.forEach(task => {
              newProject.tasks.forEach(newTask => {
                if (task.id == newTask.id && task.tickets) {
                  newTask.tickets = task.tickets;
                }
              });
          });
        }

        project = Object.assign(project, newProject);
        console.log("addProject", project);

        changed = true;
      }
    });
    if (!changed)
      this.projectList.push(newProject)
    if (willEmit)
      this.projectListChange.next(this.projectList);
  }
  /***/

  /**
  * @name addTask
  * @descr updating projectList by updating or adding a task
  *        then emit projectListChange
  * @param taskId (TaskInterface) task to update or add
  */
  public static addTask(newTask:TaskInterface, willEmit: boolean = true): void {
    this.projectList.forEach(project => {
      if (newTask.projectId == project.id) {
        let changed = false
        if (project.tasks)
          project.tasks.forEach(task => {
            if (task.id == newTask.id) {
              task = Object.assign(task, newTask);
              changed = true;
            }
          });
        if (!changed) {
          if (project.tasks) project.tasks.push(newTask);
          else project.tasks = [ newTask ]
        }
        console.log("addTask", project.tasks);

      }
    });

    if (willEmit)
      this.projectListChange.next(this.projectList);
  }
  /***/

  /**
  * @name addTicket
  * @descr updating projectList by updating or adding a task
  *        then emit projectListChange
  *
  * @param newTicket (TicketInterface) ticket to update or add
  */
  public static addTicket(newTicket:TicketInterface): void {
    this.projectList.forEach(project => {
      if (project.tasks)
        project.tasks.forEach(task => {
          if (newTicket.taskId == task.id) {
            let changed = false

            if (task.tickets)
              task.tickets.forEach(ticket => {
                if (ticket.id == newTicket.id) {
                  ticket = Object.assign(ticket, newTicket);;
                  changed = true;
                }
              });
            if (!changed) {
              if (task.tickets) task.tickets.push(newTicket);
              else task.tickets = [ newTicket ]
            }
            this.projectListChange.next(this.projectList);
            return
          }
        });
    });
  }
  /***/

  /**
  * @name setActualProject
  * @descr find and emit actual project
  *
  * @param projectId (string): id of the actual project
  */
  public static setActualProject(projectId: string): void {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].id == projectId) {
        this.projectChange.next(this.projectList[i]);
        return
      }
    }
  }
  /***/

  /**
  * @name setActualTask
  * @descr find and emit actual project and task
  *
  * @param taskId (string): id of the actual task
  */
  public static setActualTask(taskId: string): void {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].tasks)
        for (let j = 0; j < this.projectList[i].tasks.length; j++) {
          let task = this.projectList[i].tasks[j]
          if (task.id == taskId) {
            this.projectChange.next(this.projectList[i]);
            this.taskChange.next(task);
            return
          }
        }
    }
  }
  /***/

  /**
  * @name setActualTicket
  * @descr find and emit actual project, task and ticket
  *
  * @param ticketId (string): id of the actual ticket
  */
  public static setActualTicket(ticketId: string): void {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].tasks)
        for (let j = 0; j < this.projectList[i].tasks.length; j++) {
          let task = this.projectList[i].tasks[j]
          if (task.tickets)
            for (let k = 0; k < task.tickets.length; k++) {
              let ticket = task.tickets[k];
              if (ticket.id == ticketId) {
                this.projectChange.next(this.projectList[i]);
                this.taskChange.next(task);
                this.ticketChange.next(ticket);
                return
              }
            }
        }
    }
  }
  /***/

  /**
  * @name removeProject
  * @descr remove project from projectList
  *
  * @param projectId (string) project id to remove
  */
  public static removeProject(projectId: string): void {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].id == projectId) {
        this.projectList.splice(i, 1);
        this.projectListChange.next(this.projectList);
        return;
      }
    }
  }
  /***/

  /**
  * @name removeTask
  * @descr remove task from projectList
  *
  * @param projectId (string) project id of the task to remove
  * @param taskId (string) task id to remove
  */
  public static removeTask(projectId: string, taskId:string): void {
    this.projectList.forEach(project => {
      if (projectId == project.id) {
        for (let i = 0; i < project.tasks.length; i++) {
          if (project.tasks[i].id == taskId) {
            project.tasks.splice(i, 1);
            this.projectListChange.next(this.projectList);
            return;
          }
        }
      }
    });
  }
  /***/

  /**
  * @name removeTicket
  * @descr remove ticket from projectList
  *
  * @param taskId (string) task id of the ticket to remove
  * @param ticketId (string) ticket id to remove
  */
  public static removeTicket(taskId: string, ticketId: string): void {
    this.projectList.forEach(project => {
      project.tasks.forEach(task => {
        if (taskId == task.id) {
          for (let i = 0; i < task.tickets.length; i++) {
            if (task.tickets[i].id == ticketId) {
              task.tickets.splice(i, 1);
              this.projectListChange.next(this.projectList);
              return;
            }
          }
        }
      });
    });
  }
  /***/
}

export interface ProjectInterface {
  name: string,
  description: string,
  id: string,
  status: string,
  created: string,
  version: string,
  owner: {
    email: string,
    name: string,
    id: string,
    validate: boolean
  }
  tasks: Array<TaskInterface>
}

export interface TaskInterface {
  name: string,
  description: string,
  id: string,
  status: string,
  created: string,
  projectId: string,
  version: string,
  owner: {
    email: string,
    name: string,
    id: string,
    validate: boolean
  }
  tickets: Array<TicketInterface>
}

export interface TicketInterface {
  name: string,
  description: string,
  id: string,
  created: string,
  status: string,
  taskId: string
  version: string,
  owner: {
    email: string,
    name: string,
    id: string,
    validate: boolean
  }
}
