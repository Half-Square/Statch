/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-27 16:52:14                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-03 12:39:30                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
  * Replace assignement by users
  * Replace version id by version data
  * Replace labels relation data by labels
  * Item change event handler
*/

/* Imports */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import * as _ from "lodash";
/***/

/* Interfaces */
import { ILabels, IProjects, IUsers, IVersions } from "src/app/interfaces";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
import { RequestService } from "src/app/services/request.service";
/***/

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Component({
  selector: "section-ptt-details",
  templateUrl: "./ptt-details.section.html",
  styleUrls: ["./ptt-details.section.scss"]
})
export class PttDetailsSection implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() item: any;
  @Input() versions: IVersions[] = [];
  @Input() type: string;
  @Input() nbList: number;
  @Input() root: IProjects;
  @Output() itemChange = new EventEmitter();

  public labels: ILabels[] = [];
  public users: IUsers[] = [];
  public readonly status: {id: string, status: string}[] = [
    {id: "new", status: "new"},
    {id: "progress", status: "progress"},
    {id: "done", status: "done"},
    {id: "reject", status: "reject"},
    {id: "wait", status: "wait"}
  ];

  public readonly levels: {id: string, level: string}[] = [
    {id: "low", level: "low"},
    {id: "normal", level: "normal"},
    {id: "moderate", level: "moderate"},
    {id: "high", level: "high"}
  ];

  public _ = _;
  private subsciptions: Subscription[];

  constructor(public recovery: RecoveryService,
              public api: RequestService) {
    this.subsciptions = [
      this.recovery.get("users").subscribe((users) => this.users = users),
      this.recovery.get("labels").subscribe((labels) => this.labels = labels)
    ];
  }


  ngOnInit(): void {
    this.subsciptions = [
      this.recovery.get("labels").subscribe((l) => this.labels = l)
    ];
  }

  ngOnDestroy(): void {
    this.subsciptions.map((s) => s.unsubscribe());
  }

  /**
  * Replace assignement by users
  * @return - List of assigned users
  */
  public replaceUsers(): IUsers[] {
    return _.compact(this.item.assignments.map((el: {userId: string}) => {
      return _.find(this.users, {id: el.userId});
    }));
  }
  /***/

  /**
  * Replace version id by version data
  * @return - List of versions
  */
  public replaceVersion(): IVersions[] {
    return _.compact([
      _.find(this.versions, {id: this.type === "projects" ? this.item.actualVersion : this.item.targetVersionId}) as IVersions
    ]);
  }
  /***/

  /**
  * Replace labels relation data by labels
  * @return - List of label
  */
  public replaceLabels(): ILabels[] {
    return _.compact(this.item.labels.map((el: {labelId: string}) => {
      return _.find(this.labels, {id: el.labelId});
    }));
  }
  /***/

  /**
  * Item change event handler
  * @param field - On change field name
  * @param value - New value of field
  */
  public async onItemChange(field: string, value: Event): Promise<void> {
    this.item[field] = value;

    switch(field) {
    case "assignments":
      this.item.assignments = this.item.assignments.map((u: any) => {
        if (!u.userId) return {userId: u.id};
        else return u;
      });
      break;
    case "actualVersion":
      if ((value as any)["fromSearch"]) this.item[field] = [await this.createVersion(value)];
      this.item.actualVersion = this.type === "projects" ? this.item?.actualVersion[0]?.id : undefined;
      break;
    case "targetVersionId":
      this.item.targetVersionId = this.type !== "projects" ? this.item?.targetVersionId[0]?.id : undefined;
      break;
    case "status":
      this.item.status = this.item.status[0].status || this.item.status;
      break;
    case "labels":
      this.item.labels = this.item.labels.map((l: any) => {
        if (!l.labelId) return {labelId: l.id};
        else return l;
      });
      break;
    case "level":
      this.item.level = this.item.level[0].level || this.item.level;
      break;
    }

    this.itemChange.emit(this.item);
  }
  /***/

  /**
  * Create new version
  * @param value - New data
  * @return - New version
  */
  private async createVersion(value: any): Promise<IVersions> {
    return await this.api.post(`api/projects/${this.root.id}/versions`, {
      name: value.name
    }) as IVersions;
  }
  /***/
}
