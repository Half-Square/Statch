/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-20 09:41:42                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-31 19:15:52                              *
 ****************************************************************************/

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandService } from 'src/app/services/command/command.service';
import { ProjectListService, TicketInterface, VersionInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {

  constructor(private route: ActivatedRoute,
              private router: Router,
              public command: CommandService) {
    this.route.queryParams
    .subscribe((params: any) => {
      if (params.edit) this.onEdit = params.edit
      else this.onEdit = false
    });
    ProjectListService.ticketChange.subscribe((value: TicketInterface) => {
      this.ticket = structuredClone(value);
    })
  }

  public onEdit: boolean = false;
  public windowWidth: boolean = true;

  public id: string = "";
  public ticket: TicketInterface = {} as TicketInterface;

  public nbTicket: number = 0;

  public activity : any = [
  {img: "0", alt: "oui", name: "Randy", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
  {img: "0", alt: "oui", name: "Toto", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
  {img: "0", alt: "oui", name: "Tata", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
  {img: "0", alt: "oui", name: "Oui", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
  ];

  public comments: any = [];

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    if(window.innerWidth <= 1024) {
      this.windowWidth = false;
    }
    window.onresize = () => this.windowWidth = window.innerWidth >= 1024;
  }

  public saveTicket() {
    this.command.editTicket(this.ticket)
  }

  public redirectToEdit() {
    this.router.navigate(
      [ "ticket", this.ticket.id ],
      { queryParams: { edit: true } }
    )
  }

  public getTicketVersion(): VersionInterface {
    if (this.ticket.targetVersion)
      return this.ticket.targetVersion

    return { id: "", name: "", projectId: "" } as VersionInterface;
  }

  public changeTicketVersion(change: any): void {
    this.ticket.targetVersion = change;
    this.command.editTicket(this.ticket)
  }
}
