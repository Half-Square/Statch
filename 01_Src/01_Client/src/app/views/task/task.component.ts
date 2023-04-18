/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-18 17:03:31                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-04-17 13:10:50                              *
 ****************************************************************************/

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandService } from 'src/app/services/command/command.service';
import { ProjectInterface, ProjectListService, TaskInterface, TicketInterface, VersionInterface } from 'src/app/services/project-list/project-list.service';
import { ApiService } from 'src/app/services/api/api.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('nested', [
      transition(':enter', [
        animate('100ms 100ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms 100ms ease-in-out', style({ opacity: 0, transform: "translateY(-16px)" }))
      ])
    ]),
    trigger('tab', [
      transition(':enter', [
        style({ opacity: 0, transform: "translateX(16px)"}),
        animate('100ms 100ms ease-in-out', style({ opacity: 1, transform: "translateX(0)" })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: "translateX(0)"}),
        animate('100ms 100ms ease-in-out', style({ opacity: 0, transform: "translateX(16px)" }))
      ])
    ])
  ]
})
export class TaskComponent {
  constructor(private route: ActivatedRoute,
              private router: Router,
              public command: CommandService,
              private api: ApiService) {
    this.route.queryParams
    .subscribe((params: any) => {
      if (params.edit) this.onEdit = params.edit
      else this.onEdit = false
    });
    ProjectListService.taskChange.subscribe((value: TaskInterface) => {
      this.task = structuredClone(value);
      this.setAdvancement()
    })
  }

  public onEdit: boolean = false;
  public windowWidth: boolean = true;

  public id: string = "";
  public task: TaskInterface = {} as TaskInterface;

  public nbTicket: number = 0;

  public advancement: number = 0;

  public showAll: boolean = false;
  public showSelector: boolean = false;
  public selectVersion: VersionInterface = {} as VersionInterface;
  public options: Array<VersionInterface> = [];
  public filteredAdvancementTickets: any = [];
  public advancementTickets: Array<TicketInterface> = [];

  public activity : any = [];

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    if(window.innerWidth <= 1024) {
      this.windowWidth = false;
    }
    window.onresize = () => this.windowWidth = window.innerWidth >= 1024;
  }

  public saveTask() {
    this.command.editTask(this.task)
  }

  public redirectToEdit() {
    this.router.navigate(
      [ "task", this.task.id ],
      { queryParams: { edit: true } }
    )
  }

  public getTaskVersion(): VersionInterface {
    if (this.task.targetVersion)
      return this.task.targetVersion

    return { id: "", name: "", projectId: this.task.projectId } as VersionInterface;
  }

  public changeTaskVersion(change: any): void {
    console.log(change);

    this.task.targetVersion = change;

    console.log(this.task);

    this.command.editTask(this.task)
  }

  private setAdvancement(): void {
    let cpt = 0;
    let rej = 0;
    let done = 0

    this.api.request("GET", "projects/"+this.task.projectId+"/versions")
    .then((ret) => {
      let obj: any = [];
      this.options = ret;
      let versionList = ret;
      versionList.forEach((version: any) => {
        let tickets: Array<TicketInterface> = [];
        this.task.tickets.forEach(ticket => {
          if(version.id == ticket.targetVersion?.id) {
            tickets.push(ticket)
          }
        })
        obj.push({
          version,
          tickets
        })
      })
      this.filteredAdvancementTickets = obj;
    })


    if (this.task.tickets)
      this.task.tickets.forEach(ticket => {
        if (!this.task.targetVersion || (ticket.targetVersion
          && this.task.targetVersion.name == ticket.targetVersion.name)) {
          this.filteredAdvancementTickets.push(ticket)
          if (ticket.status == "reject")
            rej++
          if (ticket.status == "done")
            done++
          cpt++
        }
      });
    if (!cpt) this.advancement = 0
    else this.advancement = Math.trunc(done / (cpt - rej)  * 100)

    this.triggerShow();
  }

  public triggerShow(version?: string): void {
    if (this.showAll) {
      for (let i = 0; i < this.filteredAdvancementTickets.length; i++) {
        const element = this.filteredAdvancementTickets[i];

        if(element.version.id == version)
          this.advancementTickets = element.tickets
      }
    } else
        this.advancementTickets = this.task.tickets
  }
}
