/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-28 15:53:55                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-28 16:25:03                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
/***/

/* Interfaces */
import { ILabels } from "src/app/interfaces";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
/***/

@Component({
  selector: "view-labels-settings",
  templateUrl: "./labels-settings.view.html",
  styleUrls: ["./labels-settings.view.scss"]
})
export class LabelsSettingsView implements OnInit, OnDestroy {
  public labels: ILabels[];
  private sub: Subscription;

  constructor(private recovery: RecoveryService) {
  }

  ngOnInit(): void {
    this.sub = this.recovery.get("labels").subscribe((ret) => this.labels = ret);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
