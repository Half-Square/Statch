/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-01 16:16:44                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-02 15:26:06                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component } from "@angular/core";
import { Router } from "@angular/router";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { ILoggedUser, UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "view-login",
  templateUrl: "./login.view.html",
  styleUrls: ["./login.view.scss"]
})
export class LoginView {
  public email: string = "";
  public password: string = "";

  constructor(private router: Router,
              private api: RequestService,
              private userService: UserService) {
  }

  /**
  * Connect user
  */
  public login(): void {
    this.api.post("api/login", {
      email: this.email,
      password: this.password
    }).then((ret) => {
      this.userService.setUser(ret as ILoggedUser);
      this.router.navigate(["/projects"]);
    }).catch((error) => {
      console.error("Login error >> "+error);
    });
  }
  /***/
}
