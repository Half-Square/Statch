/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-17 16:13:37                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-17 16:24:43                               *
 *****************************************************************************/

import { Component } from '@angular/core';
import { CommandService } from 'src/app/services/command/command.service';
import { LabelsInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

  constructor(private command: CommandService) {
    this.command.getLabels()
    .then((res) => {
      this.labels = res;
      console.log(res);

    })
  }

  public labels: Array<LabelsInterface> = []

  public deleteLabel(labelId: any) {
    this.command.deleteLabel(labelId)
    .then((res) => {
      console.log("delete >> ", res);
    })
  }

  public createLabel() {
    let label = {
      name: "Bug",
      color: "red",
      description: "blalal"
    }
    this.command.createLabel(label)
    .then((res) => {
      console.log("create >> ", res);
    })
  }
}
