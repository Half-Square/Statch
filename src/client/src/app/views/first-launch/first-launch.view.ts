/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-10-05 17:50:00                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-05 20:32:17                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component } from "@angular/core";
import { environment as env } from "src/environments/environment";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { Router } from "@angular/router";
/***/

@Component({
  selector: "view-first-launch",
  templateUrl: "./first-launch.view.html",
  styleUrls: ["./first-launch.view.scss"]
})
export class FirstLaunchView {
  public host: string = "";
  public apiPort: string;
  public socketPort: string;

  constructor(private api: RequestService,
              private toast: ToastService,
              private router: Router) {
  }

  /**
  * Save system configuration
  */
  public saveConfig(): void {
    env.serverUrl = `http://${this.host}:${this.apiPort}`;
    env.socketUrl = `http://${this.host}:${this.socketPort}`;

    this.api.put("api/settings/sys", {
      host: this.host,
      api: this.apiPort,
      socket: this.socketPort
    }).then((ret) => {
      this.router.navigate(["/login"]);
    }).catch((err) => {
      console.log(err);
      this.toast.print("An error occured, please verify your configuration...", "error");
    });
  }
  /***/
}
