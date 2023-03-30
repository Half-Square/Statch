/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-30 10:22:13                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-30 10:42:03                               *
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UsersInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  constructor(private api: ApiService) {}

  public users: Array<UsersInterface> = [];

  ngOnInit() {
    this.getUsers()
  }

  private getUsers() {
    this.api.request("GET", "users")
    .then((ret) => {
      this.users = ret;
    })
  }

  public setUserRight(user: UsersInterface) {
    this.api.request("PUT", "users/"+user.id+"/right", {
      validate: user.validate,
      isAdmin: user.isAdmin
    }).then((ret) => {
      user = ret;
    })
  }
}
