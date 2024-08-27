/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2024-08-27 10:19:52                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-08-27 11:04:22                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
  * Save version
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
/***/

/* Interfaces */
import { IVersions } from "src/app/interfaces";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "view-versions",
  templateUrl: "./versions.view.html",
  styleUrls: ["./versions.view.scss"]
})
export class VersionsView implements OnInit, OnDestroy {
  public versions: IVersions[];
  private sub: Subscription;
  private id: string;

  constructor(private route: ActivatedRoute,
              private recovery: RecoveryService,
              private api: RequestService,
              private user: UserService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((p) => this.id = p["id"]);
    this.sub = this.recovery.get(`projects/${this.id}/versions`)
      .subscribe((ret) => this.versions = ret);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
  * Save version
  * @param version - Version to save
  */
  public save(version: IVersions): void {
    console.log(version); // debug

    this.api.put(
      `api/projects/${this.id}/versions/${version.id}`,
      version, this.user.getUser()?.token).then((ret) => {
      this.recovery.updateData(ret, `projects/${this.id}/versions`);
      this.toast.print(`Version has been saved !`, "success");
    }).catch((err) => {
      console.error(err);
      this.toast.print("An error occured, on saving...", "error");
    });
  }
  /***/

  /**
  * Delete version
  * @param id - Version to delete
  */
  public delete(id: string): void {
    this.api.delete(`api/projects/${this.id}/versions/${id}`, this.user.getUser()?.token)
      .then(() => {
        this.recovery.updateData({id: id, deleted: true}, `projects/${this.id}/versions`);
        this.toast.print(`Version has been saved !`, "success");
      }).catch((err) => {
        console.error(err);
        this.toast.print("An error occured, on saving...", "error");
      });
  }
  /***/
}
