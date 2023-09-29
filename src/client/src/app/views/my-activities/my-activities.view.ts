/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-29 10:43:11                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-29 11:17:26                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { IActivities } from "src/app/interfaces";

/* Services */
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "view-my-activities",
  templateUrl: "./my-activities.view.html",
  styleUrls: ["./my-activities.view.scss"]
})
export class MyActivitiesView implements OnInit {
  public activities: IActivities[];

  constructor(private api: RequestService,
              private user: UserService) {
  }

  ngOnInit(): void {
    let user = this.user.getUser();
    this.api.get(`api/users/${user?.id}/activities`, user?.token)
      .then((data) => this.activities = data as IActivities[]);
  }
}
