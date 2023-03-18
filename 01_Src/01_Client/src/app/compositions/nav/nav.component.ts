/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 14:41:39                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-18 15:04:11                               *
 *****************************************************************************/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    this.projects = ProjectListService.projects
    ProjectListService.projectListChange.subscribe((value) => {
      this.projects = value;
      console.log("NavComponent", value)
    })
  }

  public projects = new Array<ProjectInterface>;
  public pListS = ProjectListService;
}
