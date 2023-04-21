/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 14:25:08                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-04-18 17:09:33                              *
 ****************************************************************************/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {
  private static projectList: Array<ProjectInterface> = new Array<ProjectInterface>;

  private static actualProject: string = "-1";
  private static actualTask: string = "-1";
  private static actualTicket: string = "-1";

  public static projectListChange:
    Subject<Array<ProjectInterface>> = new Subject<Array<ProjectInterface>>();

  public static projectChange:
    Subject<ProjectInterface> = new Subject<ProjectInterface>();

  public static taskChange:
    Subject<TaskInterface> = new Subject<TaskInterface>();

  public static ticketChange:
    Subject<TicketInterface> = new Subject<TicketInterface>();

  public static actualChange: Subject<void> = new Subject<void>();

  public static get projects(): Array<ProjectInterface> {
    return this.projectList;
  }

  public static get projectId(): string {
    return this.actualProject;
  }

  public static get taskId(): string {
    return this.actualTask;
  }

  public static get ticketId(): string {
    return this.actualTicket;
  }

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
        changed = true;
      }
    });
    if (!changed)
      this.projectList.unshift(newProject)
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
          if (project.tasks) project.tasks.unshift(newTask);
          else project.tasks = [ newTask ]
        }
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
      if (project.id == newTicket.projectId)
        if (project.tasks)
          project.tasks.forEach(task => {
            if (newTicket.taskId == task.id) {
              let changed = false

              if (task.tickets)
                task.tickets.forEach(ticket => {
                  if (ticket.id == newTicket.id) {
                    ticket = Object.assign(ticket, newTicket);
                    changed = true;
                  }
                });
              if (!changed) {
                if (task.tickets) task.tickets.unshift(newTicket);
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
        this.actualProject = projectId;
        this.projectChange.next(this.projectList[i]);
        this.actualChange.next();
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
            this.actualProject = this.projectList[i].id;
            this.actualTask = taskId;
            this.projectChange.next(this.projectList[i]);
            this.taskChange.next(task);
            this.actualChange.next();
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
                this.actualProject = this.projectList[i].id;
                this.actualTask = ticket.taskId;
                this.actualTicket = ticketId;

                this.projectChange.next(this.projectList[i]);
                this.taskChange.next(task);
                this.ticketChange.next(ticket);
                this.actualChange.next();
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
  public static removeTicket(projectId: string, taskId: string, ticketId: string): void {
    this.projectList.forEach(project => {
      if (project.id == projectId)
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
  actualVersion: string,
  versionList: Array<VersionInterface>,
  comments: Array<CommentInterface>,
  owner: UsersInterface,
  assignments: Array<UsersInterface>,
  tasks: Array<TaskInterface>,
  labels: Array<LabelsInterface>,
  activitys: Array<ActivitysInterface>
}

export interface TaskInterface {
  name: string,
  description: string,
  id: string,
  status: string,
  level: string,
  created: string,
  projectId: string,
  targetVersion?: VersionInterface,
  comments: Array<CommentInterface>,
  owner: UsersInterface,
  assignments: Array<UsersInterface>,
  tickets: Array<TicketInterface>,
  activitys: Array<ActivitysInterface>,
  labels: Array<LabelsInterface>
}

export interface TicketInterface {
  name: string,
  description: string,
  id: string,
  created: string,
  status: string,
  level: string,
  taskId: string,
  projectId: string,
  targetVersion?: VersionInterface,
  comments: Array<CommentInterface>,
  assignments: Array<UsersInterface>,
  owner: UsersInterface,
  activitys: Array<ActivitysInterface>,
  labels: Array<LabelsInterface>
}

export interface UsersInterface {
  email: string,
  name: string,
  id: string,
  validate: boolean
  isAdmin: boolean;
}

export interface CommentInterface {
  id: string,
  author: UsersInterface,
  created: string,
  content: string,
}


export interface VersionInterface {
  id: string,
  name: string,
  projectId: string,
  tasks?: Array<string>,
  tickets?: Array<string>,
}

export interface SearchResponseInterface {
  id: string,
  name: string,
  type: string,
  icon: string,
}

export interface LabelsInterface {
  id?: string,
  name?: string,
  color?: string,
  description?: string
}

export interface ActivitysInterface {
  id: string,
  created: string,
  author: UsersInterface,
  action: string,

  type?: string,
  value?: string,

  target?: UsersInterface,
  label?: LabelsInterface,
  project?: ProjectInterface,
  task?: TaskInterface,
  ticket?: TicketInterface
}
