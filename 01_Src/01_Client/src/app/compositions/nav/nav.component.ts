/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 14:41:39                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 14:47:10                               *
 *****************************************************************************/

import { Component } from '@angular/core';

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

  constructor() {

  }


  public organisation = {
    name: "Half Square",
    id: "0",
    projects: Array<ProjectInterface>
  }
  /*
  *
  *  tree : {
        label, status, type, id, nodes: [ ... ]
     }
   *
   */
  private initTree(): void {
    let projectList = ProjectListService.getProjectList();
  }
}
