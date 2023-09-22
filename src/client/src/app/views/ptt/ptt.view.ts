/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-09-21 12:45:58                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-22 18:24:56                              *
 ****************************************************************************/

import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ITasks, ITickets } from "src/app/interfaces";
import { RecoveryService } from "src/app/services/recovery.service";

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

  public elements: ITickets[] = [];

  public type: string = "";

  public id: any = "";

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

  constructor(private route: ActivatedRoute, public recovery: RecoveryService) {}

  async ngOnInit(): Promise<void> {

    this.route.params.subscribe( async params => {
      this.type = params["type"] === "project" ? "tasks" : "tickets";
      this.id = params["id"];

    });

    // this.elements = await this.recovery.getSingleSync(this.type, this.id) as ITickets[];


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
