/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2024-07-25 20:19:12                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-07-25 21:18:28                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { RecoveryService } from "src/app/services/recovery.service";
/***/

@Component({
  selector: "component-socket-indicator",
  templateUrl: "./socket-indicator.component.html",
  styleUrls: ["./socket-indicator.component.scss"]
})
export class SocketIndicatorComponent implements OnInit, OnDestroy {
  public response: number = 0;
  public status: "ok" | "ko" | "warn" = "ko";
  private sub: Subscription;

  constructor(private recovery: RecoveryService) {
  }

  ngOnInit(): void {
    this.sub = this.recovery.ping(500, 1500).subscribe((data) => {
      this.status = data.status;
      this.response = data.time;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
