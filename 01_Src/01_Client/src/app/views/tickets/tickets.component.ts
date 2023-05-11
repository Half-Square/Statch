/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-03-17 17:24:53                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-05-11 16:40:11                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
*/

/* Imports */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/***/

/* Services */
import { ApiService } from 'src/app/services/api/api.service';
/***/

/* Interfaces */
import { TicketInterface } from 'src/app/services/project-list/project-list.service';
/***/

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  constructor(private api: ApiService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  public parentId: string = "";
  public ticketList: Array<TicketInterface>= new Array<TicketInterface>;

  ngOnInit() {
    this.route.queryParams.subscribe((query) => {
      this.parentId = query["id"] || "";
      let prefix = this.parentId ? `tasks/${this.parentId}/` : "";
      this.api.request("GET", `${prefix}tickets`).then((ret) => {
        this.ticketList = ret;
      }).catch((err) => {
        console.error(err);
      });
    });
  }

  async openNewTicket(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", `tasks/${this.parentId}/tickets`, {
        name: "New ticket",
        description: "My awesome new ticket"
      }).then((ret: any) => {
        if (ret.id)
          this.router.navigate(["/ticket/", ret.id ])
        else
          console.error("New ticket 1 error >> "+ret)
      }).catch((error: any) => {
        console.error("New ticket 2 error >> "+error)
      })
    })
  }
}
