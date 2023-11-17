/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-09-29 11:11:14                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-11-16 16:44:29                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
  * Get actor
*/

/* Imports */
import { Component, Input, OnInit } from "@angular/core";
/***/

/* Interfaces */
import { IActivities } from "src/app/interfaces";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
/***/

@Component({
  selector: "component-activity-item",
  templateUrl: "./activity-item.component.html",
  styleUrls: ["./activity-item.component.scss"]
})
export class ActivityItemComponent implements OnInit {
  @Input() activity: IActivities;
  @Input() reduce: boolean = false;
  public actor: {name: string, picture: string | null};
  public iconType: string;

  constructor(private recovery: RecoveryService) {
  }

  ngOnInit(): void {
    this.getActor();
    switch (this.activity.action.type) {
    case "CREATE":
      this.iconType = "plus-circled";
      break;
    case "DELETE":
      this.iconType = "minus-circled";
      break;
    case "SET":
      this.iconType = "update";
      break;
    }
  }

  /**
  * Get actor
  */
  public async getActor(): Promise<void> {
    let u = await this.recovery.getSingleSync("users", this.activity.actor.id);
    this.actor = {
      name: u.name,
      picture: u.picture || null
    };
  }
  /***/
}
