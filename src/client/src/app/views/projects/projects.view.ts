/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 18:44:16                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-25 13:29:42                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Create new project
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";
/***/

/* Interfaces */
import { IProjects } from "src/app/interfaces";
/***/

@Component({
  selector: "view-projects",
  templateUrl: "./projects.view.html",
  styleUrls: ["./projects.view.scss"]
})
export class ProjectsView implements OnInit, OnDestroy {
  public projects: IProjects[] | null = null;
  private subsciption: Subscription | null = null;

  constructor(private router: Router,
              private recovery: RecoveryService,
              private api: RequestService,
              private toast: ToastService,
              private user: UserService) {
  }

  ngOnInit(): void {
    this.subsciption = this.recovery.get("projects").subscribe((projects) => this.projects = projects);
  }

  ngOnDestroy(): void {
    if (this.subsciption) this.subsciption.unsubscribe();
  }

  /**
  * Create new project
  */
  public createProject(): void {
    this.api.post("api/projects", {name: "New project", description: "..."}, this.user.getUser()?.token)
      .then((ret) => {
        this.router.navigate([`/projects/${(ret as IProjects).id}`]);
      }).catch((err) => {
        console.error(err);
        this.toast.print(`Error >> ${err.message || err.statusText}`, "error");
      });
  }
  /***/
}
