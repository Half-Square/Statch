/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-22 18:44:16                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-04 11:01:45                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Create new item
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";
/***/

/* Interfaces */
import { IProjects, ITasks, ITickets, IVersions } from "src/app/interfaces";
/***/

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Component({
  selector: "view-ptt-all",
  templateUrl: "./ptt-all.view.html",
  styleUrls: ["./ptt-all.view.scss"]
})
export class PttAllView implements OnInit, OnDestroy {
  public items: IProjects[] | ITasks[] | ITickets[];
  public type: string;
  public id: string;
  public versions: IVersions[] = [];

  private qSub: Subscription;
  private pSub: Subscription;
  private subsciption: Subscription[] = [];

  constructor(private router: Router,
              private recovery: RecoveryService,
              private api: RequestService,
              private toast: ToastService,
              private user: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.qSub = this.route.queryParams.subscribe((queries) => {
      this.id = queries["id"];
    });

    this.pSub = this.route.paramMap.subscribe((params) => {
      this.subsciption.map((s) => s.unsubscribe());
      this.type = params.get("type") as string;

      this.subsciption = [
        this.recovery.get(this.type).subscribe((data) => this.items = data),
        this.recovery.get("versions").subscribe((v) => this.versions = v)
      ];
    });
  }

  ngOnDestroy(): void {
    if (this.qSub) this.qSub.unsubscribe();
    if (this.pSub) this.pSub.unsubscribe();
    this.subsciption.map((s) => s.unsubscribe());
  }

  /**
  * Create new item
  */
  public createItem(): void {
    let url = "";

    switch(this.type) {
    case "projects": url = "projects"; break;
    case "tasks": url = `projects/${this.id}/tasks`; break;
    case "tickets": url = `tasks/${this.id}/tickets`; break;
    }

    this.api.post(`api/${url}`, {
      name: `New ${this.type.slice(0, -1)}`,
      description: "..."
    }, this.user.getUser()?.token)
      .then((ret) => {
        this.recovery.updateData(ret, this.type);
        this.router.navigate([`/${this.type}/${(ret as {id: string}).id}`]);
      }).catch((err) => {
        console.error(err);
        this.toast.print(`Error >> ${err.message || err.statusText}`, "error");
      });
  }
  /***/

  /**
  * Filter list by parent
  * @param items - List of items
  * @return - Filtered list
  */
  public filterByParent(items:  any[]): any[] {
    if (!this.id || this.id == "") return items;

    return _.filter(items, (el) => (
      (el as ITasks).projectId == this.id ||
      (el as ITickets).taskId == this.id ||
      this.type == "projects"
    ));
  }
  /***/
}
