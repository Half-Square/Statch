/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 14:25:08                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-20 10:41:58                               *
 *****************************************************************************/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api/api.service';


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

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  private static api: ApiService = new ApiService();

  private static projectList: Array<ProjectInterface> = new Array<ProjectInterface>;

  public static projectListChange:
    Subject<Array<ProjectInterface>> = new Subject<Array<ProjectInterface>>();

  private static actualProject: string;
  public static projectChange:
    Subject<ProjectInterface> = new Subject<ProjectInterface>();

  public static taskChange:
    Subject<TaskInterface> = new Subject<TaskInterface>();

  public static ticketChange:
    Subject<TicketInterface> = new Subject<TicketInterface>();

  public static actualTask: TaskInterface;
  public static actualTicket: TicketInterface;


  public static get projects(): Array<ProjectInterface> {
    if (!this.projectList) {
      this.getProjectList();
      return new Array<ProjectInterface>
    }
    return this.projectList;
  }

  public static getProjectList(): Promise<Array<ProjectInterface>> {
    return new Promise<Array<ProjectInterface>>((resolve, reject) => {
      this.api.request("GET", "projects")
      .then((ret: Array<ProjectInterface>) => {
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
        return  resolve(ret)
      }).catch((err) => { return reject(err) })
    })
  }

  public static async getProject(projectId: string): Promise<ProjectInterface> {
    return new Promise<ProjectInterface>((resolve, reject) => {
      this.api.request("GET", "projects/"+projectId)
      .then((ret: ProjectInterface) => {
        this.addProject(ret)
        return resolve(ret)
      }).catch((err) => {
        return reject(err)
      })
    })
  }

  public static async getTask(taskId: string): Promise<TaskInterface> {
    return new Promise<TaskInterface>((resolve, reject) => {
      this.api.request("GET", "tasks/"+taskId)
      .then((ret: TaskInterface) => {
        this.addTask(ret.projectId, ret)
        return resolve(ret)
      }).catch((err) => {
        return reject(err)
      })
    })
  }

  public static async getTicket(ticketId: string): Promise<TicketInterface> {
    return new Promise<TicketInterface>((resolve, reject) => {
      this.api.request("GET", "tickets/"+ticketId)
      .then((ret: TicketInterface) => {
        this.addTicket(ret.taskId, ret) //TO DO get project id from back
        this.getTask(ret.taskId)
        .then(() => {
          return resolve(ret)

        })
      }).catch((err) => {
        return reject(err)
      })
    })
  }

  public static addProject(newProject:ProjectInterface): void {
    let changed = false
    this.projectList.forEach(project => {
      if (project.id == newProject.id) {
        project = Object.assign(project, newProject);
        changed = true;
      }
    });
    if (!changed)
      this.projectList.push(newProject)
    if (this.actualProject == newProject.id)
      this.projectChange.next(newProject);
    this.projectListChange.next(this.projectList);
  }

  public static addTask(projectId: string, newTask:TaskInterface): void {
    this.projectList.forEach(project => {
      if (projectId == project.id) {
        let changed = false
        if (project.tasks)
          project.tasks.forEach(task => {
            if (task.id == newTask.id) {
              task = Object.assign(task, newTask);;
              changed = true;
            }
          });
        if (!changed) {
          if (project.tasks) project.tasks.push(newTask);
          else project.tasks = [ newTask ]
        }

      }
    });
    this.projectListChange.next(this.projectList);
  }

  public static addTicket(taskId: string, newTicket:TicketInterface): void {
    this.projectList.forEach(project => {
      if (project.tasks)
        project.tasks.forEach(task => {
          if (taskId == task.id) {
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
          }
        });
    });
    this.projectListChange.next(this.projectList);
  }

  public static setActualProject(projectId: string): void {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].id == projectId) {
        this.projectChange.next(this.projectList[i]);
        return
      }
    }
  }

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
                console.log("setActualTicket", ticket);

                this.ticketChange.next(ticket);
                return
              }
            }
        }
    }
  }

  public static removeProject(projectId: string): void {
    for (let i = 0; i < this.projectList.length; i++) {
      if (this.projectList[i].id == projectId) {
        this.projectList.splice(i, 1);
        this.projectListChange.next(this.projectList);
        return;
      }
    }
  }

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

  public static removeTicket(projectId: string, taskId: string, ticketId: string): void {
    this.projectList.forEach(project => {
      if (projectId == project.id) {
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
      }
    });
  }
}
