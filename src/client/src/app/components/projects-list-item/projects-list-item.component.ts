/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-25 10:49:33                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-26 10:45:42                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
*/

/* Imports */
import { Component, Input } from "@angular/core";
/***/

/* Interfaces */
import { IProjects } from "src/app/interfaces";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
/***/

@Component({
  selector: "component-projects-list-item",
  templateUrl: "./projects-list-item.component.html",
  styleUrls: ["./projects-list-item.component.scss"]
})
export class ProjectsListItemComponent {
  @Input() project: IProjects;

  constructor(private recovery: RecoveryService) {
  }
}
