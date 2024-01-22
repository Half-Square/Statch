/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-11-30 16:28:56                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2024-01-11 14:54:00                              *
 ****************************************************************************/

import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Router } from "@angular/router";
import { RequestService } from "./request.service";
import { ToastService } from "./toast.service";
import { UserService } from "./user.service";

import { IProjects, ITasks, ITickets } from "src/app/interfaces";
import { RecoveryService } from "./recovery.service";

@Injectable({
  providedIn: "root"
})
export class PttService {

  constructor(private api: RequestService,
              private user: UserService,
              private toast: ToastService,
              private router: Router,
              private recovery: RecoveryService) {}

  /**
  * Get size of specific data
  * @param target - Tasks' or Tickets' data
  * @returns - Number, length of tasks or tickets
  */
  public nbChild(target: IProjects[] | ITasks[] | ITickets[]): number {
    let nb = _.size(target);
    if(nb > 0) return nb;
    else return 0;
  }
  /***/

  /**
  * Create Child
  * @param type - Parent type
  * @param id - Parent id
  * @param childType - Child type
  */
  public createChild(type: string, id: string, childType: string): void {
    this.api.post(`api/${type}/${id}/${childType}`, {
      name: `New ${childType.slice(0, -1)}`,
      description: `It's a new ${childType.slice(0, -1)}!`
    }, this.user.getUser()?.token)
      .then((ret) => {
        this.toast.print(`${_.capitalize(childType.slice(0, -1))} ${(ret as {id: string}).id} has been created`, "success");
        this.router.navigateByUrl(
          `${childType}/${(ret as IProjects | ITasks | ITickets).id}`
        );
      });
  }
  /***/

  /**
  * Create new item
  */
  public createProject(): void {
    this.api.post("api/projects", {
      name: `New project`,
      description: "It's a new project!"
    }, this.user.getUser()?.token)
      .then((ret) => {
        this.recovery.updateData(ret, "projects");
        this.router.navigate([`/projects/${(ret as {id: string}).id}`]);
      }).catch((err) => {
        console.error(err);
        this.toast.print(`Error >> ${err.message || err.statusText}`, "error");
      });
  }
  /***/
}
