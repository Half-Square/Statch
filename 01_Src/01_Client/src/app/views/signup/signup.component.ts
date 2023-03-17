/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 16:02:10                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 16:23:32                               *
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private api: ApiService) {}

  public  name: string = "";
  public  email: string = "";
  public  pwd: string = "";
  public  conPwd: string = "";

  public  error: boolean = false;
  public  step: number = 1;

  ngOnInit(): void {
    this.next()
  }

  private next() {
    const el = document;
    const _this = this;
    el?.addEventListener('keydown', function(e: any) {
      if (e.key === 'Enter' && _this.step < 5) {
        _this.checkStep()
      }
    });
  }

  public checkStep() {
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

  signup() {
    this.api.request("POST", "users", {
      name: this.name,
      email: this.email,
      password: this.pwd
    }).then(() => {
      this.step = 6;
    }).catch((error: any) => {
      console.error("Signup error >> "+error)
    })
  }
}
