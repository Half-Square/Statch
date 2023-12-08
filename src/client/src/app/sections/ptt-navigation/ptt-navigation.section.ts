/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-20 16:09:23                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-12-04 19:08:58                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Set open item by navigation context
  * Check if element has child
  * Toggle collapse
  * Check if item is open
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as _ from "lodash";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription, filter } from "rxjs";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
import { UserService } from "src/app/services/user.service";
import { ToastService } from "src/app/services/toast.service";
import { RequestService } from "src/app/services/request.service";
/***/

/* Interfaces */
import { IProjects, ITasks, ITickets } from "src/app/interfaces";
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
  public open: {id: string, status: string}[] = [];
  public status: {id: string, name: string}[] = [{id:"progress", name: "In progress"}, {id:"new", name: "New"}, {id:"wait", name: "Pending"}, {id:"reject", name: "Rejected"}, {id:"done", name: "Completed"}];

  private subscribers: Subscription[] = [];
  private context: {type: string, id?: string, status?: string};

  constructor(
    private recovery: RecoveryService,
    public user: UserService,
    private api: RequestService,
    private toast: ToastService,
    private router: Router) {
    router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e) => {
      let tmp = e.url.split("/");
      this.context = {type: tmp[1], id: tmp[2] || undefined};
      this.setFocusByContext();
    });
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
  * Set open item by navigation context
  */
  private async setFocusByContext(): Promise<void> {
    if (this.context.id && this.context.status) {
      this.open = []; // Clear open items

      if (this.context.type == "projects" || this.context.type == "tasks" || this.context.type == "tickets") { // Only for PTT
        this.open.push({id: this.context.id, status: this.context.status});

        let tmp;
        let item = {type: this.context.type, id: this.context.id};

        do {
          tmp = await this.recovery.getSingleSync(item.type, item.id);
          this.open.push(item.type == "tickets" ? tmp.taskId : tmp.projectId);
          item = {type: item.type == "tickets" ? "tasks" : "projects", id: item.type == "tickets" ? tmp.taskId : tmp.id};
        } while (item.type != "projects");
      }
    }
  }
  /***/

  public isOpenStatus(status: string): boolean {
    if(this.context && this.context.id && this.context.type != "projects")
      return _.find(this.open, (el) =>
        el.id === this.context.id && el.status === status) ? true :  false;
    else return false;
  }

  /**
  * Check if element has child
  * @param target - Potential child list
  * @param cond - Condition
  * @return - Boolean, child  or not
  */
  public hasChild(
    target: IProjects[] | ITasks[] | ITickets[],
    cond: {projectId?: string, taskId?: string, status?: string}): boolean {
    if (_.find(target, cond)) return true;
    else return false;
  }
  /***/

  /**
  * Toggle collapse
  * @param id - Item's id
  */
  public toggleCollapse(id: string, status: string): void {
    let i = _.findIndex(this.open, (el) => el.id === id);
    if (i == -1) this.open.push({id: id, status: status});
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
    return _.find(this.open, (el) => el.id === id) ? true :  false;
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
      description: `It's a new ${childType.slice(0, -1)}`
    }, this.user.getUser()?.token)
      .then((ret) => {
        this.recovery.updateData(ret, childType);
        this.toast.print(`${_.capitalize(childType.slice(0, -1))} ${(ret as {id: string}).id} has been created`, "success");
        this.router.navigateByUrl(
          `${childType}/${(ret as IProjects | ITasks | ITickets).id}`
        );
      });
  }
  /***/
}
