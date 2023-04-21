/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-21 11:57:48                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-21 11:57:48                               *
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UsersInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent {
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
