/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-25 10:46:34                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-25 10:49:48                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
*/
import { Component, Input } from "@angular/core";
/***/

/* Interfaces */
import { IProjects } from "src/app/interfaces";
/***/

@Component({
  selector: "section-projects-list",
  templateUrl: "./projects-list.section.html",
  styleUrls: ["./projects-list.section.scss"]
})
export class ProjectsListSection {
  @Input() projects: IProjects[] = [];
}
