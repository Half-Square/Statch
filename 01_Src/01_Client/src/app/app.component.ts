/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 16:07:54                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-20 18:11:54                              *
 ****************************************************************************/

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { UserService } from './services/user/user.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProjectListService } from './services/project-list/project-list.service';
import { CommandService } from './services/command/command.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ opacity: 0, marginLeft: '-248px' }),
        animate('0.3s ease-in', style({ opacity: 1, marginLeft: '0' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, marginLeft: '-248px'  }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'statch';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private command: CommandService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.isConnected()) {
        this.url = val;
        this.handleNavigation(val)
      }
    });
  }

  public show: boolean = true
  public  is_connected: boolean =  true

  private url: any;
  private init: boolean = false;

  ngOnInit() {
    UserService.init();

    if (this.isConnected()) {
      this.command.getProjectList();
    }
  }


  public showMenu() {
    this.show = !this.show;
  }

  public isConnected(): boolean {
    return UserService.isConnected();
  }

  private handleNavigation(navEnd: NavigationEnd): void {
    let url = navEnd.urlAfterRedirects.split("/");

    if (url[1] == 'projects') {
      this.command.getProjectList();
    }
    if (url[1] == 'project') {
      this.command.getProject(url[2])
      .then(()=> {
        ProjectListService.setActualProject(url[2]);
      });
    }

    if (url[1] == 'task') {
      this.command.getTask(url[2])
      .then(()=> {
        ProjectListService.setActualTask(url[2]);
      });
    }

    if (url[1] == 'ticket') {
      this.command.getTicket(url[2])
      .then(()=> {
        ProjectListService.setActualTicket(url[2]);
      });
    }
  }
}
