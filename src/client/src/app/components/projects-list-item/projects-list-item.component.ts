/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-25 10:49:33                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-25 11:20:27                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
*/

/* Imports */
import { Component, Input, OnInit } from "@angular/core";
import { memoize } from "lodash";
/***/

/* Interfaces */
import { IProjects, IVersions } from "src/app/interfaces";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
/***/

@Component({
  selector: "component-projects-list-item",
  templateUrl: "./projects-list-item.component.html",
  styleUrls: ["./projects-list-item.component.scss"]
})
export class ProjectsListItemComponent implements OnInit {
  @Input() project: IProjects;

  public version: IVersions | null;

  constructor(private recovery: RecoveryService) {
  }

  ngOnInit(): void {
    if (this.project.actualVersion) this.getVersion(this.project.actualVersion);
  }

  /**
  * Get project version
  * @param id - Version to get
  */
  public async getVersion(id: string): Promise<void> {
    let version = await this.recovery.getSingleSync("versions", id) as IVersions;
    this.version = version;
  }
}
