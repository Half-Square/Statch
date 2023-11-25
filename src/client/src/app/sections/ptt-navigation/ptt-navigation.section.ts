/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-20 16:09:23                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-25 12:59:39                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Check if element has child
  * Toggle collapse
  * Check if item is open
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as _ from "lodash";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
/***/

/* Interfaces */
import { IProjects, ITasks, ITickets } from "src/app/interfaces";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { ToastService } from "src/app/services/toast.service";
import { RequestService } from "src/app/services/request.service";
/***/

@Component({
  selector: "section-ptt-navigation",
  templateUrl: "./ptt-navigation.section.html",
  styleUrls: ["./ptt-navigation.section.scss"]
})
export class PttNavigationSection implements OnInit, OnDestroy {
  public projects: IProjects[] = [];
  public tasks: ITasks[] = [];
  public tickets: ITickets[] = [];
  public _ = _;
  public open: string[] = [];

  private subscribers: Subscription[] = [];

  constructor(
    private recovery: RecoveryService,
    public user: UserService,
    private api: RequestService,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    this.subscribers = [
      this.recovery.get("projects").subscribe((projects) => this.projects = projects),
      this.recovery.get("tasks").subscribe((tasks) => this.tasks = tasks),
      this.recovery.get("tickets").subscribe((tickets) => this.tickets = tickets)
    ];
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((s) => s.unsubscribe());
  }

  /**
  * Check if element has child
  * @param target - Potential child list
  * @param cond - Condition
  * @return - Boolean, child  or not
  */
  public hasChild(
    target: IProjects[] | ITasks[] | ITickets[],
    cond: {projectId?: string, taskId?: string}): boolean {
    if (_.find(target, cond)) return true;
    else return false;
  }
  /***/

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
  * Toggle collapse
  * @param id - Item's id
  */
  public toggleCollapse(id: string): void {
    let i = _.findIndex(this.open, (el) => el === id);
    if (i == -1) this.open.push(id);
    else delete this.open[i];

    this.open = _.filter(this.open, (el) => el != null); // clear array
  }
  /***/

  /**
  * Check if item is open
  * @param id - Parent id
  * @return - Boolean, open or not
  */
  public isOpen(id: string): boolean {
    return _.find(this.open, (el) => el === id) ? true :  false;
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
      name: `New ${childType.slice(0, -1)} ${this.nbChild(childType == "tasks" ? this.tasks : this.tickets)}`,
      description: "..."
    }, this.user.getUser()?.token)
      .then((ret: any) => {
        this.recovery.updateData(ret, childType);
        this.toast.print(`${_.capitalize(childType.slice(0, -1))} ${(ret as {id: string}).id} has been created`, "success");
      });
  }
  /***/
}
