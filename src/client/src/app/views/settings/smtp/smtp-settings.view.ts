/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-28 15:01:19                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-28 15:33:46                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Save
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";
/***/

/* Interfaces */
interface IStmpSettings {
  host: string,
  port: string,
  user: string,
  password: string | undefined
}
/***/

@Component({
  selector: "view-smtp-settings",
  templateUrl: "./smtp-settings.view.html",
  styleUrls: ["./smtp-settings.view.scss"]
})
export class SmtpSettingsView implements OnInit {
  public smtp: IStmpSettings;

  constructor(private api: RequestService,
              private user: UserService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.api.get(`api/settings/smtp`, this.user.getUser()?.token)
      .then((ret) => this.smtp = ret as IStmpSettings);
  }

  /**
  * Save
  */
  public save(): void {
    this.api.put(`api/settings/smtp`, {
      ...this.smtp,
      port: Number(this.smtp.port)
    }, this.user.getUser()?.token)
      .then((ret) => {
        this.smtp = ret as IStmpSettings;
        this.toast.print("Smtp settings saved !", "success");
      }).catch((err) => {
        this.toast.print("An error occured...", "error");
      });
  }
  /***/
}
