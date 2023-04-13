/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-13 14:37:37                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-13 15:00:40                               *
 *****************************************************************************/

import { Component, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

interface LabelsInteface {
  id: string,
  name: string,
  description: string,
  color: string
}

@Component({
  selector: 'app-labels-labeled',
  templateUrl: './labels-labeled.component.html',
  styleUrls: ['./labels-labeled.component.scss']
})
export class LabelsLabeledComponent {

  constructor(private api: ApiService) {
    this.getLabelsList()
  }

  @Input() name: string = "";
  @Input() color: string = "";
  @Input() desc: string = "";

  public isEdit: boolean = true;

  public options: Array<LabelsInteface> = [];

  public getLabelsList() {
    this.api.request("GET", "labels/")
    .then((ret) => {
      console.log(ret);
      this.options = ret
    })
  }

}
