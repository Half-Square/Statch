/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-11 13:11:28                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-11 13:14:32                               *
 *****************************************************************************/

import { Component } from '@angular/core';

import {
  ProjectListService,
  ProjectInterface,
  TaskInterface,
  TicketInterface
} from 'src/app/services/project-list/project-list.service';
import { UserInterface, UserService } from 'src/app/services/user/user.service';

interface ActivityInteface {
  "author": UserInterface;
  "action": string;
  "ptt": PttInterface;
  "date": string;
}

interface PttInterface {
  "name": string;
  "description": string;
  "id": string;
  "status": string;
  "created": string;
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  public activities: Array<ActivityInteface> = [
    {
      author: {id: "000", name: "Quentin", email: "quentin@hs.com", validate: true, isAdmin: true},
      action: "Assigned",
      ptt: {name: "Cooking app", description: "", id: "b0499de", status: "progress", created: "Cooper"},
      date: "2023-04-11T11:14:17+0000"
    },
    {
      author: {id: "000", name: "Quentin", email: "quentin@hs.com", validate: true, isAdmin: true},
      action: "Assigned",
      ptt: {name: "Cooking app", description: "", id: "b0499de", status: "progress", created: "Cooper"},
      date: "2023-04-11T11:14:17+0000"
    },
    {
      author: {id: "000", name: "Quentin", email: "quentin@hs.com", validate: true, isAdmin: true},
      action: "Assigned",
      ptt: {name: "Cooking app", description: "", id: "b0499de", status: "progress", created: "Cooper"},
      date: "2023-04-11T11:14:17+0000"
    }
  ]

}
