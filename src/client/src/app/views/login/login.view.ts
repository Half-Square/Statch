/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-06-01 16:16:44                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2025-05-19 17:26:11                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env } from "src/environments/environment";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { SocketService } from "src/app/services/socket.service";
import { ToastService } from "src/app/services/toast.service";
import { ILoggedUser, UserService } from "src/app/services/user.service";
import { IFeatureConfig } from "src/app/interfaces";
/***/

@Component({
  selector: "view-login",
  templateUrl: "./login.view.html",
  styleUrls: ["./login.view.scss"]
})
export class LoginView implements OnInit {
  public email: string = "";
  public password: string = "";
  public allowSignup: boolean = false;

  constructor(private router: Router,
              private api: RequestService,
              private userService: UserService,
              private toast: ToastService,
              private socket: SocketService) {
  }

  ngOnInit(): void {
    this.api.get("api/settings/features").then(res => {
      this.allowSignup = (res as IFeatureConfig).allowSignup;
    }).catch((error) => {
      console.error(error);
      this.toast.print(`Settings error >> ${error.message || error.statusText}`, "error");
    });
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
