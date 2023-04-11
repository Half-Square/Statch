/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-18 17:03:31                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-04-03 12:54:59                              *
 ****************************************************************************/

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandService } from 'src/app/services/command/command.service';
import { ProjectInterface, ProjectListService, TaskInterface, VersionInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  constructor(private route: ActivatedRoute,
              private router: Router,
              public command: CommandService) {
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

  public id: string = "";
  public task: TaskInterface = {} as TaskInterface;

  public nbTicket: number = 0;

  public advancement: number = 0;

  public activity : any = [
  {img: "0", alt: "oui", name: "Randy", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
  {img: "0", alt: "oui", name: "Toto", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
  {img: "0", alt: "oui", name: "Tata", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
  {img: "0", alt: "oui", name: "Oui", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
  ];

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
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
    if (this.task.tickets)
      this.task.tickets.forEach(ticket => {
        if (ticket.status == "reject")
          rej++
        if (ticket.status == "done")
          done++
        cpt++
      });
    if (!cpt) this.advancement = 0
    else this.advancement = Math.trunc(done / (cpt - rej)  * 100)
  }

}
