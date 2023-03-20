/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 14:41:39                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-20 18:11:33                              *
 ****************************************************************************/

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { CommandService } from 'src/app/services/command/command.service';

import {
  ProjectListService,
  ProjectInterface
} from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private api: ApiService,
              private router: Router,
              public command: CommandService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.handleNavigation(val)
      }
    });
    ProjectListService.projectListChange
    .subscribe((value: Array<ProjectInterface>) => {
      this.projectList = value;
      this.getProjects()
    })
    ProjectListService.projectChange
    .subscribe((project: ProjectInterface) => {
      this.projectId = project.id;
      this.getProjects()
    })
  }

  public projects = new Array<ProjectInterface>;
  public projectList = new Array<ProjectInterface>;

  public url: Array<string> = [];
  public projectId: string = "";

  private handleNavigation(navEnd: NavigationEnd): void {
    this.url = navEnd.urlAfterRedirects.split("/");
  }

  private getProjects(): void {
    if (this.url[1] == 'project' ||
        this.url[1] == 'task' ||
        this.url[1] == 'ticket') {
      if (this.projectId) {
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectId == this.projectList[i].id) {
            this.projects = [ this.projectList[i] ];
          }
        }
      } else {
        this.projects = this.projectList;
      }
    } else {
      this.projects = this.projectList;
    }
  };

}
