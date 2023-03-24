/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-23 16:37:07                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-24 13:11:27                              *
 ****************************************************************************/

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ProjectInterface, ProjectListService, VersionInterface } from 'src/app/services/project-list/project-list.service';

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
  }

  @Input()  version: VersionInterface = {} as VersionInterface;
  @Output() versionChange: EventEmitter<VersionInterface> = new EventEmitter<VersionInterface>;
  @Output() versionNameChange: EventEmitter<string> = new EventEmitter<string>;

  @Input() isEdit: boolean = false;
  @Input() isProject: boolean = false;

  public versionList: Array<VersionInterface> = [];
  public newName: string = "";
  public projectId: string = "";

  public isOpen: boolean = false;

  getProjectList() {
    this.api.request("GET", "projects/"+this.projectId+"/versions")
    .then((ret) => {
      console.log(this.version);

      this.versionList = ret;
      if (!this.version.name) this.isOpen = true;
    })
  }

  public versionJustChange(versionName: string): void {
    if (this.isProject) {
      this.versionNameChange.emit(versionName)
      return;
    } else {
      for (let i = 0; i < this.versionList.length; i++) {
        console.log(versionName, this.versionList[i]);

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
        this.isOpen = false;
        this.versionList.push(this.version)
        this.versionJustChange(this.version.name)
      })
    }
  }
}
