/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 16:23:16                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 16:23:16                               *
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private api: ApiService) {
  }

  private email: string = "";
  private password: string = "";

  public message: string = "";

  ngOnInit() {
    UserService.init()

    if (UserService.isConnected())
      this.router.navigate(["/"])
  }

  public login(): void {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(this.email)) {
      this.message = "Please entere a valid email address"
      return;
    }

    this.api.request("POST", "login", {
      email: this.email,
      password: this.password
    }).then((ret: any) => {
      UserService.setUser(ret)
      this.router.navigate(["/projects"])
    }).catch((error: any) => {
      console.error("Login error >> "+error)
    })
  }

}
