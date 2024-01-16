/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-28 15:53:55                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-16 19:13:12                              *
 ****************************************************************************/

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
import { PermissionsService } from "src/app/services/permissions.service";
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

  constructor(private recovery: RecoveryService,
              public perm: PermissionsService) {
  }

  ngOnInit(): void {
    this.sub = this.recovery.get("labels").subscribe((ret) => this.labels = ret);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
