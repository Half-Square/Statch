/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-27 16:52:14                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-09-29 17:46:24                              *
 ****************************************************************************/

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { RecoveryService } from "src/app/services/recovery.service";
import { Subscription } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "section-ptt-details",
  templateUrl: "./ptt-details.section.html",
  styleUrls: ["./ptt-details.section.scss"]
})
export class PttDetailsSection implements OnDestroy {

  constructor(public recovery: RecoveryService) {
    this.subsciption = [
      this.recovery.get("users").subscribe((users) => this.users = users),
      this.recovery.get("labels").subscribe((labels) => this.labels = labels)
    ];
  }

  @Input()
    id: string = "";

  @Input()
    owner: string = "";

  @Input()
    users: any = [];

  @Input()
    assignee: any = [];

  @Input()
    versionTitle: string = "";

  @Input()
    versions: any = [];

  @Input()
    status: any = [];

  @Input()
    currentStatus: any = {};

  @Input()
    labels: any = [];

  @Input()
    currentLabels: any = [];

  @Input()
    levels: any = [];

  @Input()
    currentLevel: any = [];

  @Input()
    type: string = "";

  @Input()
    listTitle: string = "";

  @Input()
    listLink: string = "";

  @Input()
    nbList: number = 0;

  @Input()
    created: any = "";

  @Output()
    cbAssignee: EventEmitter<any> = new EventEmitter<any>();

  @Output()
    cbStatus: EventEmitter<any> = new EventEmitter<any>();

  @Output()
    cbLabels: EventEmitter<any> = new EventEmitter<any>();

  @Output()
    cbLevel: EventEmitter<any> = new EventEmitter<any>();

  private subsciption: Subscription[] | null = null;

  public _ = _;

  ngOnDestroy(): void {
    if (this.subsciption) this.subsciption.forEach((s) => s.unsubscribe());
  }

  public replaceAssignee(): any[] {
    let ret: any[] = [];
    this.assignee.map((s: any) => {
      ret.push(_.find(this.users, {id: s.userId}));
    });
    return ret;
  }

  public replaceLabels(): any[] {
    let ret: any[] = [];
    this.currentLabels.map((s: any) => {
      ret.push(_.find(this.labels, {id: s.labelId}));
    });
    return ret;
  }

  public assigneeCB(event: Event): void {
    this.cbAssignee.emit(event);
  }

  public statusCB(event: Event): void {
    this.cbStatus.emit(event);
  }

  public labelsCB(event: Event): void {
    this.cbLabels.emit(event);
  }

  public levelCB(event: Event): void {
    this.cbLevel.emit(event);
  }
}
