/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 17:24:53                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 20:05:23                               *
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ProjectInterface, ProjectListService } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private api: ApiService,
              private router: Router) {
    this.projectList = ProjectListService.projects;
    ProjectListService.projectListChange.subscribe((value) => {
      this.projectList = value;
    })
  }


  public projectList: Array<ProjectInterface>;

  ngOnInit() {
    console.log("here sdf");
    ProjectListService.getProjectList()
  }

  async openNewProject(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", "projects", {
        name: "New Project",
        description: "My awesome new project"
      }).then((ret: any) => {
        if (ret.id)
          this.router.navigate(["/project/", ret.id ])
        else
          console.error("New Project 1 error >> "+ret)
      }).catch((error: any) => {
        console.error("New project 2 error >> "+error)
      })
    })
  }
}
