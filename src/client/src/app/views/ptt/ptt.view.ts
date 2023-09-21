/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-09-21 12:45:58                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-09-21 14:14:06                               *
 *****************************************************************************/

import { Component } from "@angular/core";

@Component({
  selector: "view-ptt",
  templateUrl: "./ptt.view.html",
  styleUrls: ["./ptt.view.scss"]
})
export class PttView {
  public isAssignee: boolean = true;

  public onEdit: boolean = false;

  public title: string = "Dogme";

  public description: string = "Hello";

  public progressValue: number = 50;

  public assigneeSelf(): void {
    this.isAssignee = !this.isAssignee;
  }

  public edit(): void {
    this.onEdit = !this.onEdit;
  }

  public delete(): void {
    this.onEdit = !this.onEdit;
  }

  public save(): void {
    this.onEdit = !this.onEdit;
  }

  ngOnInit(): void {
    // this.route.subcribe if (project | task | ticket) this.recovery.sub type & id get one pass type & id if err unscribe => 404 var private
    // sub => url
    // sub => data
    // unsub no use
    // header bar nav => add, sub
    // Header => Title, Description
    // Advancement => Progress, List task | ticket
    // Comments
    // Details => id, owner, assignee, version, status, labels, tt list, created
    // activity
  }
}
