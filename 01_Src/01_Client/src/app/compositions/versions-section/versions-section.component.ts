/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-23 16:37:07                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-24 16:11:02                              *
 ****************************************************************************/

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ProjectInterface, ProjectListService, TaskInterface, TicketInterface, VersionInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-versions-section',
  templateUrl: './versions-section.component.html',
  styleUrls: ['./versions-section.component.scss']
})
export class VersionsSectionComponent {

  constructor(private api: ApiService) {
    ProjectListService.projectChange.subscribe((value: ProjectInterface) => {
      if (value.id != this.projectId) {
        this.projectId = value.id;
        this.getProjectList()
      }
    })
    ProjectListService.taskChange.subscribe((value: TaskInterface) => {
      this.getProjectList()
    })
    ProjectListService.ticketChange.subscribe((value: TicketInterface) => {
      this.getProjectList()
    })

  }

  @Input()  version: VersionInterface = {} as VersionInterface;
  @Output() versionChange: EventEmitter<VersionInterface> = new EventEmitter<VersionInterface>;
  @Output() versionNameChange: EventEmitter<string> = new EventEmitter<string>;

  @Input() isEdit: boolean = false;
  @Input() isProject: boolean = false;

  public versionList: Array<VersionInterface> = [];
  public options: Array<{ text: string }> = [];
  public value: {text: string} = {text: ""}

  public newName: string = "";
  public projectId: string = "";

  getProjectList() {
    this.api.request("GET", "projects/"+this.projectId+"/versions")
    .then((ret) => {
      this.versionList = ret;
      this.options = []
      for (let i = 0; i < ret.length; i++) {
        this.options.push({ text: ret[i].name })
      }
      if (this.version.name) this.value = { text: this.version.name }
      else  this.value = { text: "" }
    })
  }

  public versionJustChange(versionName: string): void {
    if (this.isProject) {
      this.versionNameChange.emit(versionName)
      return;
    } else {
      for (let i = 0; i < this.versionList.length; i++) {
        if (this.versionList[i].name == versionName) {
          this.version = this.versionList[i];
          this.versionChange.emit(this.version)
          return
        }
      }
    }
  }

  public newVersion(): void {
    if (this.version.projectId) {
      this.api.request("POST", "projects/"+this.projectId+"/versions", {
        name: this.newName
      }).then((ret) => {
        this.version = ret;
        if (this.version.name) this.value = { text: this.version.name }
        this.versionList.push(this.version);
        this.options.push({ text: this.version.name })
        this.versionJustChange(this.version.name)
      })
    }
  }
}
