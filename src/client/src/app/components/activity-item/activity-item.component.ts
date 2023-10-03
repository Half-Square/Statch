/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-29 11:11:14                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-03 10:51:47                              *
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

  constructor(private recovery: RecoveryService) {
  }

  ngOnInit(): void {
    this.getActor();
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
