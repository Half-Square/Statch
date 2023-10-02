/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-30 15:55:46                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-02 15:04:32                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
  * Get childs
  * Save current item
  * Create child for item
  * Delete current item
  * Set item advancement
  * Sort childs by version
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import * as _ from "lodash";
/***/

/* Interfaces */
import { IActivities, IProjects, ITasks, ITickets, IVersions } from "src/app/interfaces";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "view-ptt",
  templateUrl: "./ptt.view.html",
  styleUrls: ["./ptt.view.scss"]
})
export class PttView implements OnInit, OnDestroy {
  public type: string;
  public id: string;
  public item: IProjects | ITasks | ITickets;
  public childType: string;
  public childs: ITasks[] | ITickets[] = [];
  public activities: IActivities[] = [];
  public versions: IVersions[] = [];
  public _ = _;

  private subscriptions: Subscription[] = [];
  private routeListener: Subscription;

  constructor(private recovery: RecoveryService,
              private route: ActivatedRoute,
              private router: Router,
              private api: RequestService,
              public user: UserService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.routeListener = this.route.paramMap.subscribe((p) => {
      this.type = p.get("type") as string;
      this.id = p.get("id") as string;
      this.childType = this.type == "projects" ? "tasks" : "tickets";

      this.getRootProject().then((root) => {
        this.subscriptions.map((sub) => sub.unsubscribe()); // Clear old subscriptions
        this.subscriptions = [
          this.recovery.getSingle(this.type, this.id).subscribe((el) => { // Get current item
            if (!el) this.router.navigateByUrl("/not-found");
            this.item = el;
          }),
          this.recovery.get(`projects/${root.id}/versions`).subscribe((versions) => {
            this.versions = versions;
          }),
          this.recovery.get(`${this.type}/${this.id}/activities`).subscribe((a) => {
            this.activities = a;
          })
        ];

        if (this.childType != this.type) this.subscriptions.push(this.getChilds());
      });
    });
  }

  ngOnDestroy(): void {
    this.routeListener.unsubscribe();
    this.subscriptions.map((sub) => sub.unsubscribe());
  }

  /**
  * Get root project
  * @return - Root project
  */
  private async getRootProject(): Promise<IProjects> {
    let item = await this.recovery.getSingleSync(this.type, this.id);
    if (this.type == "tickets") {
      item = await this.recovery.getSingleSync("tasks", item.taskId);
      item = await this.recovery.getSingleSync("projects", item.projectId);
    } else if (this.type == "tasks") {
      item = await this.recovery.getSingleSync("projects", item.projectId);
    }

    return item as IProjects;
  }
  /***/

  /**
  * Get childs
  * @return - Subscription
  */
  private getChilds(): Subscription {
    return this.recovery.get(this.childType).subscribe((el) => { // Get childs
      this.childs = _.filter(el, (c) => {
        return this.id === (this.childType == "tasks" ? (c as ITasks).projectId : (c as ITickets).taskId);
      });
    });
  }
  /***/

  /**
  * Create child for item
  */
  public createChild(): void {
    this.api.post(`api/${this.type}/${this.id}/${this.childType}`, {
      name: `New ${this.childType.slice(0, -1)}`,
      description: "..."
    }, this.user.getUser()?.token)
      .then((ret) => {
        this.router.navigateByUrl(`${this.childType}/${(ret as {id: string}).id}`);
        this.toast.print(`${_.capitalize(this.childType.slice(0, -1))} ${(ret as {id: string}).id} has been created`, "success");
      });
  }
  /***/

  /**
  * Save current item
  */
  public saveItem(): void {
    this.api.put(`api/${this.type}/${this.id}`, this.item, this.user.getUser()?.token)
      .then(() => {
        this.toast.print(`${_.capitalize(this.type.slice(0, -1))} ${this.id} has been saved`, "success");
      });
  }
  /***/

  /**
  * Delete current item
  */
  public deleteItem(): void {
    this.api.delete(`api/${this.type}/${this.id}`, this.user.getUser()?.token)
      .then(() => {
        this.toast.print(`${_.capitalize(this.type.slice(0, -1))} ${this.id} has been removed`, "success");
        this.router.navigateByUrl("/");
      });
  }
  /***/

  /**
  * Set item advancement
  * @return - Percent value of child with done state
  */
  public setAdvancement(): number {
    let length = this.childs.length;
    let completed = (_.countBy(this.childs, {status: "done"}) as {true: number | undefined}).true || 0;
    let res = Math.floor(completed * 100 / length);

    return !_.isNaN(res) ? res : 0;
  }
  /***/

  /**
  * Sort childs by version
  */
  public sortElement(option: Event): void {
    console.log(option); // Selected versions
    // Filter child to print
    // New progress value
  }
}
