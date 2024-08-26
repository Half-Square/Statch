/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2024-01-15 17:24:09                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-08-26 12:19:27                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Format data before printing
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { RecoveryService } from "src/app/services/recovery.service";
/***/

/* Interfaces */
interface IStats {
  tasks: {
    total: number,
    status: {name: string, nb: number}[],
    owners: {id: string, nb: number}[],
    newByMonth: {year: number, tasks: number[]}[],
    labels: {id: string, nb: number}[],
    versions: {id: string, nb: number}[],
    levels: {name: string, nb: number}[],
    labelByMonth: {
      year: number,
      month: {id: string, nb: number}[][]
    }[]
  }
}

interface IData {
  data: number[],
  labels: string[]
}
/***/

@Component({
  selector: "view-stats",
  templateUrl: "./stats.view.html",
  styleUrls: ["./stats.view.scss"]
})
export class StatsView implements OnInit {
  public type: string;
  public id: string;
  public stats: IStats;

  public tasksByStatus: IData;
  public newByMonth: IData;
  public tasksByLabel: IData;

  constructor(private api: RequestService,
              private route: ActivatedRoute,
              private toast: ToastService,
              private recovery: RecoveryService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.type = param["type"];
      this.id = param["id"];
      this.api.get(`api/${this.type}/${this.id}/stats`)
        .then((ret) => {
          this.stats = ret as IStats;
          this.formatData();
        }).catch((err) => {
          console.error(err);
          this.toast.print("An error occured please retry later...");
        });
    });
  }

  /**
  * Format data before printing
  */
  public async formatData(): Promise<void> {
    this.tasksByStatus = {
      data: this.stats.tasks.status.map((el) => el.nb),
      labels: this.stats.tasks.status.map((el) => el.name)
    };

    this.newByMonth = {
      data: this.stats.tasks.newByMonth[0].tasks,
      labels: [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ]
    };

    let labels = [];
    for(let i = 0; i < this.stats.tasks.labels.length; i++) {
      labels.push(await this.recovery.getSingleSync("labels", this.stats.tasks.labels[i].id));

    }

    this.tasksByLabel = {
      data: this.stats.tasks.labels.map((el) => el.nb),
      labels: labels.map((el) => el.name)
    };
  }
  /***/
}
