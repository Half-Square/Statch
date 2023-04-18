/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-04-18 16:08:54                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-18 16:17:12                               *
 *****************************************************************************/

import { Component, Input } from '@angular/core';
import { ActivitysInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-activity-comp',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  @Input() activity: ActivitysInterface = {} as ActivitysInterface
  @Input() small: boolean = false;
}
