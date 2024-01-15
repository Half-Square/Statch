/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-11-16 15:38:34                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2024-01-15 16:54:13                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Import database file
  * Dump database file
  * Dump image from server
*/

/* Imports */
import { Component, ElementRef, ViewChild } from "@angular/core";
import { environment as env } from "src/environments/environment";
/***/

/* Services */
import { ToastService } from "src/app/services/toast.service";
import { ILoggedUser, UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
/***/

@Component({
  selector: "view-database-settings",
  templateUrl: "./database-settings.view.html",
  styleUrls: ["./database-settings.view.scss"]
})
export class DatabaseSettingsView {
  @ViewChild("file") file: ElementRef;
  @ViewChild("fileImg") fileImg: ElementRef;

  constructor(private toast: ToastService,
              private user: UserService,
              private router: Router) {
  }

  /**
  * Import database file
  */
  public import(): void {
    let file = this.file.nativeElement.files[0];
    const { token } = this.user.getUser() as ILoggedUser;

    if (file) {
      let data = new FormData();
      data.append("file", file);

      fetch(`${env.serverUrl}/api/database/upload`, {
        method: "POST",
        headers: {
          "x-token": token
        },
        body: data
      }).then((ret) => {
        if (ret.ok) {
          this.toast.print("Database file uploaded ! You need to reconnect...", "info");

          setTimeout(() => {
            this.user.clearUser();
            this.router.navigateByUrl("/login");
            window.location.href = "/";
          }, 3000);
        } else throw ret;
      }).catch((err) => {
        console.error(err);
        this.toast.print("An error occured, please retry later...", "error");
      });
    } else {
      this.toast.print("No file selected...", "error");
    }
  }
  /***/

  /**
  * Dump database file
  */
  public async dump(): Promise<void> {
    this.toast.print("The download will start soon", "info");

    try {
      const { token } = this.user.getUser() as ILoggedUser;

      fetch(`${env.serverUrl}/api/database/dump`, {
        method: "GET",
        headers: {
          "x-token": token
        }
      }).then((ret) => {
        if (!ret.ok) throw ret.statusText;

        ret.blob().then((file) => {
          let a = document.createElement("a");
          let url = window.URL.createObjectURL(file);

          a.href = url;
          a.download = "dump.db";
          document.body.appendChild(a);
          a.click();
          a.remove();
        }).catch((err) => {
          throw err;
        });
      }).catch((err) => {
        console.error(err);
        this.toast.print("An error occured, please retry later...", "error");
      });
    } catch (err) {
      console.error(err);
      this.toast.print("An error occured, please retry later...", "error");
    }
  }
  /***/

  /**
  * Dump image from server
  */
  public dumpImg(): void {
    this.toast.print("The download will start soon", "info");

    try {
      const { token } = this.user.getUser() as ILoggedUser;

      fetch(`${env.serverUrl}/api/database/dump/img`, {
        method: "GET",
        headers: {
          "x-token": token
        }
      }).then((ret) => {
        if (!ret.ok) throw ret.statusText;

        ret.blob().then((file) => {
          let a = document.createElement("a");
          let url = window.URL.createObjectURL(file);

          a.href = url;
          a.download = "images.zip";
          document.body.appendChild(a);
          a.click();
          a.remove();
        }).catch((err) => {
          throw err;
        });
      }).catch((err) => {
        console.error(err);
        this.toast.print("An error occured, please retry later...", "error");
      });
    } catch (err) {
      console.error(err);
      this.toast.print("An error occured, please retry later...", "error");
    }
  }
  /***/

  /**
  * Import database file
  */
  public importImg(): void {
    let file = this.fileImg.nativeElement.files[0];
    const { token } = this.user.getUser() as ILoggedUser;

    if (file) {
      let data = new FormData();
      data.append("file", file);

      fetch(`${env.serverUrl}/api/database/upload/img`, {
        method: "POST",
        headers: {
          "x-token": token
        },
        body: data
      }).then((ret) => {
        if (ret.ok) {
          this.toast.print("Database file uploaded !", "info");
        } else throw ret;
      }).catch((err) => {
        console.error(err);
        this.toast.print("An error occured, please retry later...", "error");
      });
    } else {
      this.toast.print("No file selected...", "error");
    }
  }
  /***/
}
