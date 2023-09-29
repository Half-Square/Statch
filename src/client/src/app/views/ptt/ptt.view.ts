/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-21 12:45:58                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-09-29 12:23:48                              *
 ****************************************************************************/

import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { IProjects, ITasks, ITickets } from "src/app/interfaces";
import { RecoveryService } from "src/app/services/recovery.service";
import { Subscription } from "rxjs";
import * as _ from "lodash";
import { UserService } from "src/app/services/user.service";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "view-ptt",
  templateUrl: "./ptt.view.html",
  styleUrls: ["./ptt.view.scss"]
})
export class PttView implements OnInit, OnDestroy {

  public isAssignee: boolean = false;
  public onEdit: boolean = false;
  public progressValue: number = 0;
  public projects: any = {};
  public tasks: any = {};
  public printTasks: any = {};
  public tickets: any = {};
  public printTickets: any = {};
  public currentElement: any;
  public toggleVersion: any;
  public versions: any = [];
  public currentUser: any = [];
  public comments: any = [];
  public _ = _;
  public type: string = "";
  public typeChild: string = "";
  public id: string = "";
  private subsciption: Subscription[] | null = null;

  constructor(private route: ActivatedRoute,
              public recovery: RecoveryService,
              private router: Router,
              private user: UserService,
              private api: RequestService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.subsciption = [

      this.route.params.subscribe(params => {
        this.type = params["type"];
        this.typeChild = params["type"] === "projects" ? "tasks" : "tickets";
        this.id = params["id"];
        this.currentUser = this.user.getUser();
      }),

      this.recovery.get("projects").subscribe((projects) => this.projects = projects),

      this.recovery.get("tasks").subscribe((tasks) =>  {
        this.tasks = tasks;
        this.printTasks = tasks;
      }),

      this.recovery.get("tickets").subscribe((tickets) => {
        this.tickets = tickets;
        this.printTickets = tickets;
      }),

      this.recovery.get("versions").subscribe((versions) => {
        this.versions = versions;
        this.currentElement = this.getCurrentElement();
        this.isAssignee = this.checkAssignee();
        this.progressValue = this.setAdvancement();
      }),

      this.recovery.get(this.type + "/" + this.id + "/" + "comments").subscribe((comments) => this.comments = comments),

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentElement = this.getCurrentElement();
          this.recovery.get(this.type + "/" + this.id + "/" + "comments").subscribe((comments) => this.comments = comments);
          this.isAssignee = this.checkAssignee();
          this.progressValue = this.setAdvancement();
          this.toggleVersion = this.type === "projects" ? this.currentElement.actualVersion : this.currentElement.targetVersionId;
        }
      })

    ];
  }

  /**
   * Unsubscribe when view's destroyed.
   */
  ngOnDestroy(): void {
    if (this.subsciption) this.subsciption.forEach((s) => s.unsubscribe());
  }

  private setAdvancement(): number {
    const elements = this.type === "projects" ? this.printTasks : this.printTickets;

    let cpt = 0;
    let rej = 0;
    let done = 0;

    for (let i = 0; i < elements.length; i++) {
      if ((elements[i].targetVersionId
        && (elements[i].targetVersionId === _.find(this.type === "projects" ? this.projects : this.tasks, {id: this.id}).targetVersionId ))) {
        if (elements[i].status == "reject")
          rej++;
        if (elements[i].status == "done")
          done++;
        cpt++;
      }
    }

    if (!cpt) return 0;
    else return Math.trunc(done / (cpt - rej) * 100);
  }

  public getCurrentElement(): any {
    return _.find(this.type == "tickets" ? this.tickets : (this.type == "projects" ? this.projects : this.tasks), {id: this.id});
  }

  public checkAssignee(): boolean {
    if(_.find(this.currentElement.assignments, {userId: this.currentUser.id}))
      return true;
    else
      return false;
  }

  public assigneeSelf(): void { // to do
    this.isAssignee = !this.isAssignee;
  }

  public headerSave(event: Event): void { // to do
    console.log(event);
  }

  public commentPublish(event: Event): void { // to do
    this.api.post(`api/${this.type}/${this.id}/comments`,
      {content: event}, this.user.getUser()?.token)
      .then((ret) => {
        this.comments.push(ret);
        this.toast.print("Comment publish", "success");
      })
      .catch(() => {
        this.toast.print("An error occured...", "error");
      });
  }

  public sortElement(option: any): void {
    const elements = this.type === "projects" ? this.tasks : this.tickets;

    let obj: any = [];

    elements.forEach((element: any) => {
      if(element.targetVersionId === option.id)
        obj.push(element);
    });

    if(option.length > 0) {
      if(this.type === "projects")
        this.printTasks = obj;
      else
        this.printTickets = obj;
    } else {
      if(this.type === "projects")
        this.printTasks = _.filter(elements, {projectId: this.id});
      else
        this.printTickets = _.filter(elements, {projectId: this.id});
    }

    this.setAdvancement();
  }
}
