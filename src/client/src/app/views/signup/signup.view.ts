/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-02 15:12:36                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-02 15:42:27                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * ???
  * Signup new user
*/

/* Imports */
import { Component } from "@angular/core";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
/***/

@Component({
  selector: "view-signup",
  templateUrl: "./signup.view.html",
  styleUrls: ["./signup.view.scss"]
})
export class SignupView {
  public  name: string = "";
  public  email: string = "";
  public  pwd: string = "";
  public  conPwd: string = "";

  public  error: boolean = false;
  public  step: number = 1;

  constructor(private api: RequestService) {
  }

  /**
  * ???
  */
  public checkStep(): void {
    let error = false;
    switch (this.step) {
    case 2:
      if(this.name.length < 1) error = true;
      break;
    case 3:
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!this.email.match(mailformat)) error = true;
      break;

    case 4:
      if (this.pwd != this.conPwd) error = true;
      break;
    }

    if (error) {
      this.error = true;
    } else {
      this.error = false;
      this.step++;
    }

    if (this.step === 5) {
      this.signup();
    }
  }
  /***/

  /**
  * Signup new user
  */
  signup(): void {
    this.api.post("api/users", {
      name: this.name,
      email: this.email,
      password: this.pwd
    }).then(() => {
      this.step = 6;
    }).catch((error) => {
      console.error("Signup error >> "+error);
    });
  }
  /***/
}
