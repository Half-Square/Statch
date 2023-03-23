/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 12:23:56                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-22 14:35:18                              *
 ****************************************************************************/

import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProjectInterface, ProjectListService } from 'src/app/services/project-list/project-list.service';

interface CrumbsInterface {
  name: string,
  path: string
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  constructor(private router: Router,
              private route: ActivatedRoute) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.handleNavigation(val)
      }
    });
    this.projects = ProjectListService.projects;
    ProjectListService.projectListChange.subscribe((value) => {
      this.projects = value;
      this.setCrumbs()
    })
  }

  private projects: Array<ProjectInterface> = [];
  public crumbs: Array<CrumbsInterface> = [];

  private url: Array<string> = [];

  private projectsCrumb = { name: "Projects", path: "/projects"};

  private handleNavigation(navEnd: NavigationEnd): void {
    this.url = navEnd.urlAfterRedirects.split("/");
  }

  /**
  * @name setCrumbs
  * @descr set crumbs from project list and actual url
  *
  */
  private setCrumbs(): void {
    let url = this.url;
    if (url[1] == 'projects') {
      this.setCrumbProjects()
    } else if (url[1] == 'project') {
      this.setCrumbProject(url)
    } else if (url[1] == 'task') {
      this.setCrumbTask(url)
    } else if (url[1] == 'ticket') {
      this.setCrumbTicket(url)
    }
  }
  /***/

  /**
  * @name setCrumbProjects
  * @descr set crumbs from project list on projects page
  *
  */
  private setCrumbProjects(): void {
    this.crumbs = [ this.projectsCrumb ];
  }
  /***/

  /**
  * @name setCrumbProject
  * @descr set crumbs from project list on project page
  *
  */
  private setCrumbProject(url: Array<string>): void {
    this.crumbs = [ this.projectsCrumb ];
    let id = url[2];
    for (let i = 0; i < this.projects.length; i++) {
      if (id == this.projects[i].id) {
        this.crumbs.push({
          name: this.projects[i].name,
          path: "/project/"+this.projects[i].id
        })
      }
    }
  }
  /***/

  /**
  * @name setCrumbTask
  * @descr set crumbs from project list on task page
  *
  */
  private setCrumbTask(url: Array<string>): void {
    this.crumbs = [ this.projectsCrumb ];
    let taskId = url[2]
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].tasks)
        for (let j = 0; j < this.projects[i].tasks.length; j++) {
          let task = this.projects[i].tasks[j]
          if (task.id == taskId) {
            this.crumbs.push({
              name: this.projects[i].name,
              path: "/project/"+this.projects[i].id
            }, {
              name: task.name,
              path: "/task/"+task.id
            })
            return
          }
        }
    }
  }
  /***/

  /**
  * @name setCrumbTicket
  * @descr set crumbs from project list on ticket page
  *
  */
  private setCrumbTicket(url: Array<string>): void {
    this.crumbs = [ this.projectsCrumb ];
    let ticketId = url[2]
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].tasks)
        for (let j = 0; j < this.projects[i].tasks.length; j++) {
          let task = this.projects[i].tasks[j]
          if (task.tickets)
            for (let k = 0; k < task.tickets.length; k++) {
              let ticket = task.tickets[k];
              if (ticket.id == ticketId) {
                this.crumbs.push({
                  name: this.projects[i].name,
                  path: "/project/"+this.projects[i].id
                }, {
                  name: task.name,
                  path: "/task/"+task.id
                }, {
                  name: ticket.name,
                  path: "/ticket/"+ticket.id
                })
                return
              }
            }
        }
    }
  }
  /***/
}
