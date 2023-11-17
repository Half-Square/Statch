/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-20 15:37:10                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-17 15:11:21                              *
 ****************************************************************************/

import { Component, Input, OnInit } from "@angular/core";

import { ToastService } from "src/app/services/toast.service";

/**
 * Toast Component
 */
@Component({
  selector: "component-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"]
})
export class ToastComponent implements OnInit {
  @Input()
    message: string = "Hello world";

  @Input()
    type: "error" | "warn" | "info" | "success" = "info";

  public icon: string = "";

  constructor(public toast: ToastService) {
  }

  ngOnInit(): void {
    this.toast.getMessage().subscribe((toast) => {
      this.message = toast.message;
      this.type = toast.type;

      switch (toast.type) {
      case "error":
        this.icon = "cross-circled";
        break;
      case "warn":
        this.icon = "warning";
        break;
      case "info":
        this.icon = "information-circled-2";
        break;
      case "success":
        this.icon = "check-circled";
        break;
      }
    });

  }
}
