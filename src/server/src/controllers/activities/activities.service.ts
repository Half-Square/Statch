/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-27 09:51:47                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-27 11:34:00                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Handle post request
  * Handle delete request
  * Handle put request
  * Save activity
*/

/* Imports */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
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
  }
}
/***/

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {
  }

  /**
  * Handle post request
  * @param user - User's data
  * @param data - Response data
  * @param controller - Called controller
  */
  public handlePost(
    user: {id: string},
    data: {id: string, name: string},
    controller: string): void {
    this.save({
      actor: {type: "user", id: user.id},
      action: {type: "CREATE", curr: data.name},
      target: {type: controller, id: data.id}
    });
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
    controller: string): Promise<void> {
    this.save({
      actor: {type: "user", id: user.id},
      action: {type: "DELETE", curr: target.name},
      target: {type: controller, id: target.id}
    });
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
      await this.save({
        actor: {type: "user", id: user.id},
        action: {type: "SET", prev: diff[i].prev, curr: diff[i].curr, field: diff[i].field},
        target: {type: controller, id: res["id"]}
      });
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
  private async save(data: IData): Promise<void> {
    await this.prisma.activity.create({
      data: {
        actor: JSON.stringify(data.actor),
        action: JSON.stringify(data.action),
        target: JSON.stringify(data.target)
      }
    });
  }
  /***/
}