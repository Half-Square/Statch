/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-09-21 15:40:44                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-22 18:05:55                              *
 ****************************************************************************/

import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { RecoveryService } from "src/app/services/recovery.service";
import { ITasks, ITickets } from "src/app/interfaces";

@Component({
  selector: "section-ptt-list",
  templateUrl: "./ptt-list.section.html",
  styleUrls: ["./ptt-list.section.scss"]
})
export class PttListSection {
  @Input()
    link: string = "";

  @Input()
    elements: ITickets[] = [];

  @Input()
    type: string = "";

  constructor(public recovery: RecoveryService) {}

  public async getVersion(id: string | null): Promise<string> {
    if(id) {
      const ret = await this.recovery.getSingleSync("version", id) as {name: string};
      return ret.name;
    }
    return "";
  }

  public async getAssignee(id: string | null):
    Promise<{name: string, imgLink: string}[]> {

    if(id) {
      const assignee = await this.recovery.getSingleSync("assigments", id) as [];
      const ret: {name: string, imgLink: string}[] = [];
      assignee.forEach( async element => {
        const user = await this.recovery.getSingleSync("user", element) as {name: string, imgLink: string};
        ret.push({name: user.name, imgLink: user.imgLink});
      });
      return ret;
    }
    return [];
  }

  // ngOnInit(): void {
  //   this.route.queryParams
  //     .subscribe(params => {
  //       this.type = params["type"];
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.route.queryParams.unsubscribe();
  // }
}
