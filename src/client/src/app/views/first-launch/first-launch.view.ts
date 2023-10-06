/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-10-05 17:50:00                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-06 12:11:41                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component } from "@angular/core";
import { environment as env } from "src/environments/environment";
import { Router } from "@angular/router";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { ILoggedUser, UserService } from "src/app/services/user.service";
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
  public readonly modes: {value: string, id: string, name: string}[] =  [
    {id: "0", name: "Production", value: "prod"},
    {id: "1", name: "Demo", value: "demo"}
  ];
  public mode: {value: string, id: string, name: string} = this.modes[0];

  constructor(private api: RequestService,
              private toast: ToastService,
              private router: Router,
              private user: UserService) {
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
      socket: this.socketPort,
      mode: this.mode.value
    }).then((ret) => {
      if ((ret as {id?: string})?.id === "demo") this.user.setUser(ret as ILoggedUser);
      this.router.navigate(["/login"]);
    }).catch((err) => {
      console.error(err);
      this.toast.print("An error occured, please verify your configuration...", "error");
    });
  }
  /***/
}
