/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 16:07:54                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-18 17:37:04                               *
 *****************************************************************************/

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ opacity: 0, marginLeft: '-248px' }),
        animate('0.3s linear', style({ opacity: 1, marginLeft: '0' })),
      ]),
      transition(':leave', [
        animate('0.3s linear', style({ opacity: 0, marginLeft: '-248px'  }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'statch';

  constructor(private router: Router,
              private route: ActivatedRoute) {
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd && this.isConnected()) {
          this.handleNavigation(val)
        }
      });
    }

  public show: boolean = true
  public  is_connected: boolean =  true

  ngOnInit() {
    UserService.init();

    if (this.isConnected())
      ProjectListService.getProjectList();
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
      ProjectListService.getProjectList();
    }
    if (url[1] == 'project') {
      ProjectListService.getProject(url[2]);
      ProjectListService.setActualProject(url[2]);
    } else {
    }
    if (url[1] == 'task') {
      ProjectListService.getTask(url[2]);
      ProjectListService.setActualTask(url[2]);
    }

    if (url[1] == 'ticket') {
      ProjectListService.getTicket(url[2]);
      ProjectListService.setActualTicket(url[2]);
    }
  }
}
