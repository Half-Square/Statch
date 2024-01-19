/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-28 15:01:19                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-16 19:20:31                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Save
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { PermissionsService } from "src/app/services/permissions.service";
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
              private toast: ToastService,
              public perm: PermissionsService) {
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
      }).catch(() => {
        this.toast.print("An error occured...", "error");
      });
  }
  /***/
}
