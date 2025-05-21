/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2025-05-19 15:50:40                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2025-05-21 09:58:37                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Update settings
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { IFeatureConfig } from "src/app/interfaces";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "view-system-settings",
  templateUrl: "./system-settings.view.html",
  styleUrls: ["./system-settings.view.scss"]
})
export class SystemSettingsView implements OnInit {
  public features: IFeatureConfig;

  constructor(private api: RequestService,
              private toast: ToastService,
              private user: UserService) {
  }

  ngOnInit(): void {
    this.api.get("api/settings/features").then(res => {
      this.features = res as IFeatureConfig;
    }).catch(err => {
      console.error(err);
    });
  }

  /**
  * Update settings
  * @param value - New value
  * @param key - Key to update
  */
  public updateSettings(value: boolean, key: string): void {
    this.features[key] = value;

    this.api.put("api/settings/features", this.features, this.user.getUser()?.token).then(res => {
      this.features = res as IFeatureConfig;
      this.toast.print("Settings updated !", "success");
    }).catch(err => {
      console.error(err);
      this.features[key] = !value;
    });
  }
  /***/
}
