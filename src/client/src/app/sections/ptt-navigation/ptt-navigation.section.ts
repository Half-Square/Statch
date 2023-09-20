/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-20 16:09:23                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-20 17:04:02                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
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
  private subscribers: Subscription[] = [];

  constructor(private recovery: RecoveryService) {
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
}
