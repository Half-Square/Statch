/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-28 13:52:36                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-28 14:39:16                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Save profile
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
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
}
