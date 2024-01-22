/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-06-01 16:16:44                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-11-14 10:20:36                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env } from "src/environments/environment";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { SocketService } from "src/app/services/socket.service";
import { ToastService } from "src/app/services/toast.service";
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
              private userService: UserService,
              private toast: ToastService,
              private socket: SocketService) {
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
      this.socket.connect(env.socketUrl, {}, this.userService);
      this.toast.print("Connected !", "success");
      this.router.navigate(["/projects"]);
    }).catch((error) => {
      console.error(error);
      this.toast.print(`Login error >> ${error.message || error.statusText}`, "error");
    });
  }
  /***/
}
