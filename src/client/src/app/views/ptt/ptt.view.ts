/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-21 12:45:58                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-09-29 19:33:59                              *
 ****************************************************************************/

import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { IActivities, IProjects, ITasks, ITickets } from "src/app/interfaces";
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
  public activities: IActivities[];
  public _ = _;
  public type: string = "";
  public typeChild: string = "";
  public id: string = "";
  private subsciption: Subscription[] | null = null;

  constructor(private route: ActivatedRoute,
              public recovery: RecoveryService,
              private router: Router,
              public user: UserService,
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
          this.api.get(`api/${this.type}/${this.id}/activities`,
            this.user.getUser()?.token)
            .then((data) => this.activities = data as IActivities[]);
        }
      })

    ];

    this.api.get(`api/${this.type}/${this.id}/activities`, this.user.getUser()?.token)
      .then((data) => this.activities = data as IActivities[]);
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

  public assigneeUser(user: any, self: boolean): void {
    let obj: any[] = [];

    if(!self) {
      user.forEach((el: any) => {
        obj.push({id: el.id});
      });
    } else {
      this.currentElement.assignments.forEach((element: any) => {
        obj.push({id: element.userId});
      });
      const index = _.findIndex(obj, {id: user.id});
      if(index !== -1)
        obj.splice(index, 1);
      else
        obj.push({id: user.id});
    }

    this.api.put(`api/${this.type}/${this.id}/assignments`,
      {users: obj}, this.user.getUser()?.token)
      .then((ret) => {
        this.currentElement.assignments = ret;
        this.isAssignee = this.checkAssignee();
        this.toast.print(`Succes : Assignments updated`, "success");
      })
      .catch(() => {
        this.toast.print("An error occured...", "error");
      });
  }

  public changeStatus(event: any): void {
    this.api.put(`api/${this.type}/${this.id}`,
      {status: event[0].status}, this.user.getUser()?.token)
      .then((ret) => {
        this.currentElement = ret;
        this.toast.print(`Succes : ${this.type} status changed`, "success");
      })
      .catch(() => {
        this.toast.print("An error occured...", "error");
      });
  }

  public changeLabels(labels: any): void {
    let obj: any[] = [];

    labels.forEach((el: any) => {
      obj.push({labelId: el.id});
    });

    this.api.put(`api/${this.type}/${this.id}`,
      {labels: obj}, this.user.getUser()?.token)
      .then((ret) => {
        this.currentElement = ret;
        this.isAssignee = this.checkAssignee();
        this.toast.print(`Succes : Labels updated`, "success");
      })
      .catch(() => {
        this.toast.print("An error occured...", "error");
      });
  }

  public changeLevel(event: any): void {
    this.api.put(`api/${this.type}/${this.id}`,
      {level: event[0].level}, this.user.getUser()?.token)
      .then((ret) => {
        this.currentElement = ret;
        this.toast.print(`Succes : ${this.type} level changed`, "success");
      })
      .catch(() => {
        this.toast.print("An error occured...", "error");
      });
  }

  public headerSave(event: {name: string, description: string}): void {
    const cond = {
      name: this.currentElement.name,
      description: this.currentElement.description
    };
    if(JSON.stringify(event) != JSON.stringify(cond)) {
      this.api.put(`api/${this.type}/${this.id}`,
        event, this.user.getUser()?.token)
        .then((ret) => {
          this.currentElement = ret;
          this.toast.print(`Succes : ${this.type} saved`, "success");
        })
        .catch(() => {
          this.toast.print("An error occured...", "error");
        });
    }
  }

  public commentPublish(event: Event): void {
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
        this.printTickets = _.filter(elements, {taskId: this.id});
    }


    this.setAdvancement();
  }

  public newItem(): void {
    this.api.post(`api/${this.type}/${this.id}/${this.typeChild}`, {
      name: `New ${this.typeChild.slice(0, -1)}`,
      description: `New empty ${this.typeChild.slice(0, -1)}`
    }, this.user.getUser()?.token).then((ret) => {
      this.router.navigateByUrl(`${this.typeChild}/${(ret as {id: string}).id}`);
    });
  }

  public deleteItem(): void {
    this.api.delete(`api/${this.type}/${this.id}`, this.user.getUser()?.token)
      .then((ret) => {
        this.router.navigateByUrl("/");
        this.toast.print(`${this.type} deleted`, "success");
      });
  }

  public changeVersion(event: any): void {
    const id = this.type === "projects" ? this.id : this.currentElement.projectId;
    if(event.fromSearch) {
      this.api.post(`api/projects/${id}/versions`,
        {name: event.name}, this.user.getUser()?.token)
        .then((ret) => {
          this.changeVersion([ret]);
        })
        .catch(() => {
          this.toast.print("An error occured...", "error");
        });
    } else {
      let obj: any = [];

      if(event.length > 0)
        obj = this.type === "projects" ? {actualVersion: event[0].id} : {targetVersionId: event[0].id};
      else
        obj = this.type === "projects" ? {actualVersion: null} : {targetVersionId: null};

      console.log(obj);

      this.api.put(`api/${this.type}/${this.id}`,
        obj, this.user.getUser()?.token)
        .then((ret) => {
          console.log(ret);

          this.currentElement = ret;
          this.toast.print(`Succes : ${this.type} version changed`, "success");
        })
        .catch(() => {
          this.toast.print("An error occured...", "error");
        });
    }
  }
}
