/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-24 15:14:47                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-27 13:01:45                              *
 ****************************************************************************/

import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { CommandService } from 'src/app/services/command/command.service';

import {
  ProjectListService,
  ProjectInterface,
  TaskInterface,
  TicketInterface
} from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent {

  constructor(private router: Router,
              public command: CommandService) {
    this.projects = [{
      name: "Cooking app",
      description: "test",
      id: "S_LA65br",
      status: "progress",
      created: "Quentin",
      actualVersion: "0.1.0",
      versionList: [ { id:"0", name: "0.1.0", projectId: "S_LA65br" }, ],
      comments: [],
      owner: {email: "", name: "", id: "", validate: true },
      assignments: [],
      tasks: [{
        name: "Cooking app",
        description: "test",
        id: "ZemPMIsh",
        projectId: "",
        status: "progress",
        created: "Quentin",
        targetVersion: { id:"0", name: "0.1.0", projectId: "S_LA65br" },
        comments: [],
        owner: {email: "", name: "", id: "", validate: true },
        assignments: [],
        tickets: [{
          name: "Cooking app",
          description: "test",
          id: "d348dq8",
          taskId: "",
          status: "progress",
          created: "Quentin",
          targetVersion: { id:"0", name: "0.1.0", projectId: "S_LA65br" },
          comments: [],
          owner: {email: "", name: "", id: "", validate: true },
          assignments: [],
        }]
      }]
    },
    {
      name: "Cooking app",
      description: "test",
      id: "S_LA65br",
      status: "progress",
      created: "Quentin",
      actualVersion: "0.1.0",
      versionList: [ { id:"0", name: "0.1.0", projectId: "S_LA65br" }, ],
      comments: [],
      owner: {email: "", name: "", id: "", validate: true },
      assignments: [],
      tasks: [{
        name: "Cooking app",
        description: "test",
        id: "ZemPMIsh",
        projectId: "",
        status: "progress",
        created: "Quentin",
        targetVersion: { id:"0", name: "0.1.0", projectId: "S_LA65br" },
        comments: [],
        owner: {email: "", name: "", id: "", validate: true },
        assignments: [],
        tickets: [{
          name: "Cooking app",
          description: "test",
          id: "d348dq8",
          taskId: "",
          status: "progress",
          created: "Quentin",
          targetVersion: { id:"0", name: "0.1.0", projectId: "S_LA65br" },
          comments: [],
          owner: {email: "", name: "", id: "", validate: true },
          assignments: [],
        }]
      }]
    }]
  }
  ngOnInit() {

  }

  public projectId: string = "";
  public taskId: string = "";
  public ticketId: string = "";

  public projects = new Array<ProjectInterface>;
  public open: boolean = false;

  @Input() isOpen: boolean = false;

  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>;

  public showCollapse: boolean = false;
  public isInit: boolean = false;

  /**
  * @name toggleCollapse
  * @descr Close / Open collapse
  *
  *
  */
  public toggleCollapse(): void {
    this.isInit = true;

    this.showCollapse = !this.showCollapse;
    if (this.showCollapse)
      this.onOpen.emit();
  }
  /***/

  /**
  * @name show
  * @descr return showCollapse if the component is init else isOpen
  *
  * @returns boolean
  */
  public show(): boolean {
    if (this.isInit)
      return this.showCollapse
    return this.showCollapse = this.isOpen
  }
  /***/


}

