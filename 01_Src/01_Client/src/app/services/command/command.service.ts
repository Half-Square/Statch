/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 22:34:38                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-28 17:02:07                              *
 ****************************************************************************/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { ProjectInterface, ProjectListService, TaskInterface, TicketInterface, UsersInterface } from '../project-list/project-list.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private api: ApiService,
              private router: Router) { }

  /**
  * @name getProjectList
  * @descr GET a projects on api,
  *        then merge them to the project list
  *
  * @returns (Promise<<Array<ProjectInterface>>): Resolve projects
  */
  public getProjectList(): Promise<Array<ProjectInterface>> {
    return new Promise<Array<ProjectInterface>>((resolve, reject) => {
      this.api.request("GET", "projects")
      .then((ret: Array<ProjectInterface>) => {
        ProjectListService.addProjectList(ret);
        return resolve(ret)
      }).catch((err) => { return reject(err) })
    })
  }
  /***/

  /**
  * @name getProject
  * @descr GET a project on api,
  *        then add it to the project list
  *
  * @param projectId (String): project id to get
  *
  * @returns (Promise<ProjectInterface>): Resolve project
  */
  public async getProject(projectId: string, willEmit: boolean = true): Promise<ProjectInterface> {
    return new Promise<ProjectInterface>((resolve, reject) => {
      this.api.request("GET", "projects/"+projectId)
      .then((ret: ProjectInterface) => {
        ProjectListService.addProject(ret, willEmit)
        return resolve(ret)
      }).catch((err) => {
        return reject(err)
      })
    })
  }
  /***/

  /**
  * @name getTask
  * @descr GET a task on api,
  *        then add it to the project list
  *
  * @param taskId (String): Task id to get
  *
  * @returns (Promise<TaskInterface>): Resolve task
  */
  public async getTask(taskId: string, willEmit: boolean = true): Promise<TaskInterface> {
    return new Promise<TaskInterface>((resolve, reject) => {
      this.api.request("GET", "tasks/"+taskId)
      .then((ret: TaskInterface) => {
        if (ProjectListService.isProjectInit(ret.projectId)) {
          ProjectListService.addTask(ret, willEmit)
          return resolve(ret)
        } else {
          this.getProject(ret.projectId, false)
          .then(() => {
            ProjectListService.addTask(ret, willEmit)
            return resolve(ret)
          })
        }
      }).catch((err) => {
        return reject(err)
      })
    })
  }
  /***/

  /**
  * @name getTicket
  * @descr GET a ticket on api,
  *        GET the ticket task on api,
  *        then add them to the project list
  *
  * @param ticketId (String): Ticket id to get
  *
  * @returns (Promise<TicketInterface>): Resolve ticket
  */
  public async getTicket(ticketId: string): Promise<TicketInterface> {
    return new Promise<TicketInterface>((resolve, reject) => {
      this.api.request("GET", "tickets/"+ticketId)
      .then((ret: TicketInterface) => {
        if (ProjectListService.isTaskInit(ret.taskId)) {
          ProjectListService.addTicket(ret)
          return resolve(ret)
        } else {
          this.getTask(ret.taskId, false)
          .then(() => {
            ProjectListService.addTicket(ret);
            return resolve(ret)
          }).catch((err) => {
            return reject(err)
          })
        }
      }).catch((err) => {
        return reject(err)
      })
    })
  }
  /***/

  /**
  * @name openNewProject
  * @descr POST a new project on api,
  *        then add it to the project list
  *        and redirect to the project page
  *
  * @return (Promise<void>): Resolve on valid POST project
  */
  public async openNewProject(): Promise<void> {
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
  /***/


  /**
  * @name openNewTask
  * @descr POST a new task on api,
  *        then add it to the project list
  *        and redirect to the task page
  *
  * @param projectId (String): Project id on wich we create a task
  *
  * @return (Promise<void>): Resolve on valid POST task
  */
  public async openNewTask(projectId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", "projects/"+projectId+"/tasks", {
        name: "New Task",
        description: "My awesome new Task"
      }).then((ret: any) => {
        ProjectListService.addTask(ret);
        this.router.navigate(["/task/", ret.id ])
      }).catch((error: any) => {
        console.error("New Task error >> "+error)
      })
    })
  }
  /***/

  /**
  * @name openNewTicket
  * @descr POST a new ticket on api,
  *        then add it to the project list
  *        and redirect to the ticket page
  *
  * @param taskId (String): Task id on wich we create a ticket
  *
  * @return (Promise<void>): Resolve on valid POST ticket
  */
  public async openNewTicket(taskId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", "tasks/"+taskId+"/tickets", {
        name: "New Ticket",
        description: "My awesome new ticket"
      }).then((ret: any) => {
        ProjectListService.addTicket(ret);
        this.router.navigate(["/ticket/", ret.id ])
      }).catch((error: any) => {
        console.error("New project 2 error >> "+error)
      })
    })
  }
  /***/

  /**
  * @name editProject
  * @descr PUT a project on api,
  *        then update it from the project list
  *        and redirect to the project page
  *
  * @param project (ProjectInterface): Project to edit
  *
  * @return (Promise<void>): Resolve on valid PUT project
  */
  public async editProject(project: ProjectInterface): Promise<void> {
    console.log("heresdf ", project);

    return new Promise<void>((resolve, reject) => {
      this.api.request("PUT", "projects/"+project.id, project)
      .then((ret: any) => {
        ProjectListService.addProject(ret);
        this.router.navigate(["project", project.id])
      }).catch((error: any) => {
        console.error("editProject error >> "+error)
      })
    })
  }
  /***/

  /**
  * @name editTask
  * @descr PUT a task on api,
  *        then update it from the project list
  *        and redirect to the task page
  *
  * @param task (ProjectInterface): Task to edit
  *
  * @return (Promise<void>): Resolve on valid PUT task
  */
  public async editTask(task: TaskInterface): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("PUT", "tasks/"+task.id, task)
      .then((ret: any) => {
        ProjectListService.addTask(task);
        this.router.navigate(["/task/", task.id ])
      }).catch((error: any) => {
        console.error("editTask error >> "+error)
      })
    })
  }
  /***/

  /**
  * @name editTicket
  * @descr PUT a ticket on api,
  *        then update it from the project list
  *        and redirect to the ticket page
  *
  * @param task (TicketInterface): Ticket to edit
  *
  * @return (Promise<void>): Resolve on valid PUT ticket
  */
  public async editTicket(ticket: TicketInterface): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("PUT", "tickets/"+ticket.id, ticket)
      .then((ret: any) => {
        ProjectListService.addTicket(ticket);
        this.router.navigate(["/ticket/", ticket.id ])
      }).catch((error: any) => {
        console.error("editTask error >> "+error)
      })
    })
  }
  /***/

  /**
  * @name deleteProject
  * @descr DELETE a project on api,
  *        then remove it from the project list
  *        and redirect to the projects page
  *
  * @param projectId (string): Project id to delete
  *
  * @return (Promise<void>): Resolve on valid DELETE project
  */
    public async deleteProject(projectId: string): Promise<void> {
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
    /***/

    /**
    * @name deleteTask
    * @descr DELETE a task on api,
    *        then remove it from the project list
    *        and redirect to the task project page
    *
    * @param task (TaskInterface): task to delete
    *
    * @return (Promise<void>): Resolve on valid DELETE task
    */
    public async deleteTask(task: TaskInterface): Promise<void> {
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
    /***/

    /**
    * @name deleteTicket
    * @descr DELETE a ticket on api,
    *        then remove it from the project list
    *        and redirect to the ticket task page
    *
    * @param ticket (TicketInterface): ticket to delete
    *
    * @return (Promise<void>): Resolve on valid DELETE ticket
    */
    public async deleteTicket(ticket: TicketInterface): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        this.api.request("DELETE", "tickets/"+ticket.id, {})
        .then((ret: any) => {
          ProjectListService.removeTicket(ticket.projectId, ticket.taskId, ticket.id);
          this.router.navigate(["/task/", ticket.taskId ])
        }).catch((error: any) => {
          console.error("New project 2 error >> "+error)
        })
      })
    }
    /***/


    public assignMySelf(type: string, data: ProjectInterface | TaskInterface | TicketInterface) {
      console.log("here");

      let user = UserService.getUser();
      delete user.token
      if (!data.assignments) data.assignments = []
      data.assignments.push(user)

      if (type == "project" && data) this.editProject(data as ProjectInterface);
      if (type == "task" && data) this.editTask(data as TaskInterface);
      if (type == "ticket" && data) this.editTicket(data as TicketInterface);
    }
}
