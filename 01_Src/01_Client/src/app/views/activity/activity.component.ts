/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-04-11 13:11:28                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-04-18 15:47:37                              *
 ****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandService } from 'src/app/services/command/command.service';

import {
  ProjectListService,
  ProjectInterface,
  TaskInterface,
  TicketInterface
} from 'src/app/services/project-list/project-list.service';
import { UserInterface, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  constructor(private router: Router,
              public command: CommandService) {
                console.log(this.activities);

  }

  async ngOnInit() {
    this.activities = await this.command.getMyActivitys()
      console.log("this.activities", await this.command.getMyActivitys());
  }

  public activities: any = []

}
