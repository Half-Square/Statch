/******************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-23 16:37:07                               *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-23 17:28:43                               *
 *****************************************************************************/

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { VersionInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-versions-section',
  templateUrl: './versions-section.component.html',
  styleUrls: ['./versions-section.component.scss']
})
export class VersionsSectionComponent {

  constructor(private api: ApiService) {}

  @Input() version: VersionInterface = {} as VersionInterface;
  @Output() versionChange: EventEmitter<VersionInterface> = new EventEmitter<VersionInterface>;
  @Output() versionNameChange: EventEmitter<string> = new EventEmitter<string>;

  @Input() isEdit: boolean = false;
  @Input() isProject: boolean = false;

  public versionList: Array<VersionInterface> = [];

  ngOnInit() {
    console.log(this.version);

    this.api.request("GET", "projects/"+this.version.projectId+"/versions")
    .then((ret) => {
      this.versionList = ret;
    })
  }

  versionJustChange() {
    if (this.isProject) {
      this.versionNameChange.emit(this.version.name)
      return;
    } else {
      for (let i = 0; i < this.versionList.length; i++) {
        if (this.versionList[i].name == this.version.name) {
          this.version = this.versionList[i];
          this.versionChange.emit(this.version)
        }
      }
    }
  }
}
