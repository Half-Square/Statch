/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2024-01-15 17:24:09                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2024-01-16 10:14:43                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
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

  constructor(private api: RequestService,
              private route: ActivatedRoute,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.type = param["type"];
      this.id = param["id"];
      this.api.get(`api/${this.type}/${this.id}/stats`)
        .then((ret) => this.stats = ret as IStats)
        .catch((err) => {
          console.error(err);
          this.toast.print("An error occured please retry later...");
        });
    });
  }
}
