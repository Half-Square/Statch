/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-30 15:55:46                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-30 16:41:05                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
  * Get childs
  * Create child for item
  * Delete current item
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import * as _ from "lodash";
/***/

/* Interfaces */
import { IProjects, ITasks, ITickets } from "src/app/interfaces";
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
  public item: IProjects | ITasks | ITickets;
  public type: string;
  public id: string;
  public childType: string;
  public childs: ITasks[] | ITickets[] = [];
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

      this.subscriptions.map((sub) => sub.unsubscribe()); // Clear old subscriptions
      this.subscriptions = [
        this.recovery.getSingle(this.type, this.id).subscribe((el) => { // Get current item
          if (!el) this.router.navigateByUrl("/not-found");
          this.item = el;
        })
      ];

      if (this.childType != this.type) this.subscriptions.push(this.getChilds());
    });
  }

  ngOnDestroy(): void {
    this.routeListener.unsubscribe();
    this.subscriptions.map((sub) => sub.unsubscribe());
  }

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
}
