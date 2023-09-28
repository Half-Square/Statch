/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-28 13:52:36                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-28 19:19:14                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Save profile
  * Upload user avatar
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { environment as env } from "src/environments/environment";
/***/

/* Services */
import { ILoggedUser, UserService } from "src/app/services/user.service";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
/***/

@Component({
  selector: "view-profile",
  templateUrl: "./profile.view.html",
  styleUrls: ["./profile.view.scss"]
})
export class ProfileView implements OnInit {
  public profile: ILoggedUser;
  public url: string = `${env.serverUrl}/api/files/`;

  constructor(private user: UserService,
              private api: RequestService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.profile = this.user.getUser() as ILoggedUser;
  }


  /**
  * Save profile
  */
  public saveProfile(): void {
    this.api.put(`api/users/${this.profile.id}`,
      this.profile,
      this.profile.token)
      .then((ret) => {
        this.user.setUser(ret as ILoggedUser);
        this.toast.print("Profile saved !", "success");
      }).catch((err) => {
        console.error(err);
        this.toast.print("An error occured, please enter your login", "error");
        this.user.logout();
      });
  }
  /***/

  /**
  * Upload user avatar
  * @param e - File input event
  */
  public uploadAvatar(e: Event): void {
    try {
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (files && files[0]) {
        let form = new FormData();
        form.append("file", files[0]);

        let requestHeaders: HeadersInit = new Headers();
        requestHeaders.set("x-token", this.user.getUser()?.token || "");

        fetch(`${env.serverUrl}/api/files`, {
          method: "POST",
          headers: requestHeaders,
          body: form
        }).then(async(ret) => {
          let json = await ret.json();
          let user = this.user.getUser();

          user = await this.api.put(`api/users/${user ? user.id : "0"}`, {
            ...user,
            oldPicture: user?.picture,
            picture: json.path
          }, user?.token) as ILoggedUser;

          console.log(user);
          this.user.setUser(user);
          this.profile = user;
        });
      } else {
        throw "File not found";
      }
    } catch (err) {
      console.error(err);
    }
  }
  /***/
}
