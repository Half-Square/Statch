/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2023-09-27 09:51:47                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-08-27 10:52:50                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Handle post request
  * Handle delete request
  * Handle put request
  * Save activity
  * Format assignement for final data
  * Format activities
  * Unformat activities before getting
*/

/* Imports */
import { Injectable } from "@nestjs/common";
import { Activity, Assignment } from "@prisma/client";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
import { SocketService } from "src/services/socket/socket.service";
/***/

/* Interfaces */
interface IData {
  actor: {
    id: string,
    type: string
  },
  action: {
    type: string,
    field?: string,
    prev?: string,
    curr?: string
  },
  target: {
    id: string,
    type: string
  },
  toPrint?: string
}
/***/

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService,
              private socket: SocketService) {
  }

  /**
  * Handle post request
  * @param user - User's data
  * @param data - Response data
  * @param controller - Called controller
  */
  public async handlePost(
    user: {id: string},
    data: {id: string, name: string},
    controller: string,
    parent?: string): Promise<void> {
    let ret = await this.save({
      actor: {type: "user", id: user.id},
      action: {type: "CREATE", curr: data.name},
      target: {type: controller, id: data.id},
      toPrint: parent
    });

    this.socket.broadcast(`users/${user.id}/activities`, this.unFormat(ret));
    this.socket.broadcast(`${controller}/${data.id}/activities`, this.unFormat(ret));
    if (ret.toPrint) {
      let type = controller == "tickets" ? "tasks" : "projects";
      this.socket.broadcast(`${type}/${parent}/activities`, this.unFormat(ret));
    }
  }
  /***/

  /**
  * Handle delete request
  * @param user - User's data
  * @param targetId - Item's id removed
  * @param controller - Called controller
  */
  public async handleDelete(
    user: {id: string},
    target: {id: string, name: string},
    controller: string,
    parent?: string): Promise<void> {
    let ret = await this.save({
      actor: {type: "user", id: user.id},
      action: {type: "DELETE", curr: target.name},
      target: {type: controller, id: target.id},
      toPrint: parent
    });

    this.socket.broadcast(`users/${user.id}/activities`, this.unFormat(ret));
    this.socket.broadcast(`${controller}/${target.id}/activities`, this.unFormat(ret));
    if (ret.toPrint) {
      let type = controller == "tickets" ? "tasks" : "projects";
      this.socket.broadcast(`${type}/${parent}/activities`, this.unFormat(ret));
    }
  }
  /***/

  /**
  * Handle put request
  * @param user - User's data
  * @param body - Request body
  * @param res - Request response
  * @param controller - Called controller
  */
  public async handlePut(
    user: {id: string}, 
    body: unknown, 
    res: unknown, 
    controller: string): Promise<void> {
    let diff = this.getDiff(body, res);
    
    for(let i = 0; i < diff.length; i++) {
      let ret = await this.save({
        actor: {type: "user", id: user.id},
        action: {type: "SET", prev: diff[i].prev, curr: diff[i].curr, field: diff[i].field},
        target: {type: controller, id: res["id"]}
      });

      this.socket.broadcast(`users/${user.id}/activities`, this.unFormat(ret));
      this.socket.broadcast(`${controller}/${res["id"]}/activities`, this.unFormat(ret));
    }
  }
  /***/

  /**
  * Get difference
  * @param prev - Previous object data
  * @param curr - Updated object data
  * @return - List of differences 
  */
  private getDiff(
    prev: unknown, 
    curr: unknown): {field: string, prev: string, curr: string}[] {
    delete prev["created"]; // Prevent date false positive 
    return Object.keys(prev).map((key) => {
      if (curr[key] !== prev[key]) return {field: key, prev: prev[key], curr: curr[key]};
    }).filter((el) => el !== undefined);
  }
  /***/

  /**
  * Save activity
  * @param data - Activity data
  */
  private async save(data: IData): Promise<Activity> {
    return await this.prisma.activity.create({
      data: {
        actor: JSON.stringify(data.actor),
        action: JSON.stringify(data.action),
        target: JSON.stringify(data.target),
        toPrint: data.toPrint || undefined
      }
    });
  }
  /***/

  /**
  * Format assignement for final data
  * @param data - Assignement item
  * @return - Formated data 
  */
  public formatAssignment(data: Assignment): {target: string} {
    let tmp = {projectId: data.projectId, tasksId: data.taskId, ticketId: data.ticketId};
    let ret = {type: "", id: ""};

    if (tmp.projectId) ret = {type: "projects", id: tmp.projectId};
    else if (tmp.tasksId) ret = {type: "tasks", id: tmp.tasksId};
    else if (tmp.ticketId) ret = {type: "tickets", id: tmp.ticketId};

    return {target: JSON.stringify(ret)};
  }
  /***/

  /**
  * Format activities before saving
  * @param data - Activity data
  * @return - Formated data 
  */
  public format(data: Activity): Activity {
    return {
      ...data,
      actor: JSON.parse(data.actor),
      action: JSON.parse(data.action),
      target: JSON.parse(data.target)
    };
  }
  /***/

  /**
  * Unformat activities before getting
  * @param data - Activity data
  * @return - Formated data
  */
  public unFormat(data: Activity): Activity {
    return data = {
      ...data,
      actor: JSON.parse(data.actor),
      action: JSON.parse(data.action),
      target: JSON.parse(data.target)
    };
  }
  /***/
}
