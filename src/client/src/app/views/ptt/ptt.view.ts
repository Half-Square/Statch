/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-21 12:45:58                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-26 11:06:32                              *
 ****************************************************************************/

import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IProjects, ITasks, ITickets } from "src/app/interfaces";
import { RecoveryService } from "src/app/services/recovery.service";
import { Subscription } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "view-ptt",
  templateUrl: "./ptt.view.html",
  styleUrls: ["./ptt.view.scss"]
})
export class PttView implements OnInit, OnDestroy {
  public isAssignee: boolean = true;
  public onEdit: boolean = false;
  public title: string = "Dogme";
  public description: string = "Hello";
  public progressValue: number = 50;
  public elements: ITickets[] = [];
  public projects: any = {};
  public currentElement: any;
  public toggleVersion: any;
  public versions: any = [];
  public _ = _;
  public type: string = "";
  public typeChild: string = "";
  public id: string = "";
  private subsciption: Subscription[] | null = null;

  constructor(private route: ActivatedRoute,
              public recovery: RecoveryService) {
  }

  ngOnInit(): void {
    this.subsciption = [
      this.route.params.subscribe(params => {
        this.type = params["type"];
        this.typeChild = params["type"] === "projects" ? "tasks" : "tickets";
        this.id = params["id"];
      }),
      this.recovery.get("projects").subscribe((projects) => this.projects = projects), // single
      this.recovery.get(this.typeChild).subscribe((elements) => this.elements = elements)
    ];

    this.recovery.getSingleSync(this.type, this.id).then((element) => {
      this.currentElement = element;
      this.toggleVersion = this.type === "projects" ? this.currentElement.actualVersion : this.currentElement.targetVersionId;
    });

    this.progressValue = this.setAdvancement();
  }

  /**
   * Unsubscribe when view's destroyed.
   */
  ngOnDestroy(): void {
    if (this.subsciption) this.subsciption.forEach((s) => s.unsubscribe());
  }

  private setAdvancement(): number {
    let cpt = 0;
    let rej = 0;
    let done = 0;

    this.elements.forEach(element => {
      if ((element.targetVersionId
        && (this.type === "projects" ? element.targetVersionId === this.currentElement.actualVersion : element.targetVersionId === this.currentElement.targetVersionId))) {
        if (element.status == "reject")
          rej++;
        if (element.status == "done")
          done++;
        cpt++;
      }
    });

    if (!cpt) return 0;
    else return Math.trunc(done / (cpt - rej) * 100);
  }

  public assigneeSelf(): void {
    this.isAssignee = !this.isAssignee;
  }

  public edit(): void {
    this.onEdit = !this.onEdit;
  }

  public delete(): void {
    this.onEdit = !this.onEdit;
  }

  public save(): void {
    this.onEdit = !this.onEdit;
  }
}
