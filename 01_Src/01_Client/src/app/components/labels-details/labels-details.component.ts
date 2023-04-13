/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-13 13:48:25                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-13 13:48:25                               *
 *****************************************************************************/

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-labels-details',
  templateUrl: './labels-details.component.html',
  styleUrls: ['./labels-details.component.scss']
})
export class LabelsDetailsComponent {
  @Input() id: string = "";
  @Input() name: string = "";
  @Input() color: string = "";
  @Input() desc: string = "";
}
