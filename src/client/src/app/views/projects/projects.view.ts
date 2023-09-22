/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 18:44:16                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-22 19:17:22                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
/***/

/* Interfaces */
import { IProjects } from "src/app/interfaces";
import { Subscription } from "rxjs";
/***/

@Component({
  selector: "view-projects",
  templateUrl: "./projects.view.html",
  styleUrls: ["./projects.view.scss"]
})
export class ProjectsView implements OnInit, OnDestroy {
  public projects: IProjects[] | null = null;
  private subsciption: Subscription | null = null;

  constructor(private recovery: RecoveryService) {
  }

  ngOnInit(): void {
    this.subsciption = this.recovery.get("projects").subscribe((projects) => this.projects = projects);
  }

  ngOnDestroy(): void {
    if (this.subsciption) this.subsciption.unsubscribe();
  }
}
