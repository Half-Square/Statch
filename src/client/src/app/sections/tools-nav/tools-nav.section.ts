/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-25 10:29:00                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-29 16:07:47                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component } from "@angular/core";
import { Router } from "@angular/router";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "section-tools-nav",
  templateUrl: "./tools-nav.section.html",
  styleUrls: ["./tools-nav.section.scss"]
})
export class ToolsNavSection {
  constructor(private router: Router,
              private api: RequestService,
              private user: UserService) {
  }

  /**
  * Create new ptt item
  */
  public newPttItem(): void {
    let url: string = this.router.url;

    if (url.match(new RegExp("/projects$"))) this.newItem("projects", "projects"); // Create project
    else if (url.match(new RegExp("/projects/.{8}"))) this.newItem("tasks", `projects/${url.split("/")[2]}/tasks`); // Create task
    else if (url.match(new RegExp("/tasks/.{8}"))) this.newItem("tickets", `tasks/${url.split("/")[2]}/tickets`); // Create ticket
  }
  /***/

  /**
  * Send Post request
  * @param type - Item's type to create
  * @param path - API path
  */
  private newItem(type: string, path: string): void {
    console.log("Create ", type);

    this.api.post(`api/${path}`, {
      name: `New ${type.slice(0, -1)}`,
      description: `New empty ${type.slice(0, -1)}`
    }, this.user.getUser()?.token).then((ret) => {
      this.router.navigateByUrl(`${type}/${(ret as {id: string}).id}`);
    });
  }
  /***/
}
