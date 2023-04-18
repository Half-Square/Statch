/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 16:49:59                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-04-18 17:21:52                              *
 ****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandService } from 'src/app/services/command/command.service';
import { ProjectInterface, ProjectListService, TaskInterface, VersionInterface } from 'src/app/services/project-list/project-list.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
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
export class ProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              public command: CommandService) {
    this.route.queryParams
    .subscribe((params: any) => {
      if (params.edit) this.onEdit = params.edit
      else this.onEdit = false
    });

    ProjectListService.projectChange.subscribe((value: ProjectInterface) => {
      this.project = structuredClone(value)
      this.setAdvancement()
    })
  }

  public onEdit: boolean = false;
  public windowWidth: boolean = true;

  public id: string = "";
  public project: ProjectInterface = {} as ProjectInterface;


  public nbTicket: number = 0;
  public advancement: number = 0;

  public showAll: boolean = false;
  public showSelector: boolean = false;
  public selectVersion: VersionInterface = {} as VersionInterface;
  public options: Array<VersionInterface> = [];
  public filteredAdvancementTasks: any = [];
  public advancementTasks: Array<TaskInterface> = [];

  public activity : any = [];

  public comments: any = [];

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    if(window.innerWidth <= 1024) {
      this.windowWidth = false;
      this.getProjectVersion();
    }
    window.onresize = () => this.windowWidth = window.innerWidth >= 1024;
  }

  public saveProject() {
    this.command.editProject(this.project)
    .then((ret) => {
      this.project = ret
    })
  }

  public redirectToEdit() {
    this.router.navigate(
      [ "project", this.project.id ],
      { queryParams: { edit: true } }
    )
  }

  public getProjectVersion(): VersionInterface {
    if (this.project.versionList && this.project.versionList.length > 0 &&
        this.project.actualVersion) {
      for (let i = 0; i < this.project.versionList.length; i++) {
        if (this.project.versionList[i].name ==  this.project.actualVersion)
          return this.project.versionList[i]
      }
    }
    return { id: "", name: "", projectId: this.id } as VersionInterface;
  }

  public changeProjectVersion(change: any): void {
    this.project.actualVersion = change;
    this.command.editProject(this.project)
  }

  private setAdvancement(): void {
    let cpt = 0;
    let rej = 0;
    let done = 0

    console.log(this.project);
    let ret: any = [];
    this.options = this.project.versionList;

    this.project.versionList.forEach(version => {
      let tasks: Array<TaskInterface> = [];
      this.project.tasks.forEach(task => {
        if(version.id == task.targetVersion?.id) {
          tasks.push(task)
        }
      })
      ret.push({
        version,
        tasks
      })
    })
    this.filteredAdvancementTasks = ret

    if (this.project.tasks)
      this.project.tasks.forEach(task => {
        if (!this.project.actualVersion || (task.targetVersion
          && task.targetVersion.name == this.project.actualVersion)) {
          if (task.status == "reject")
            rej++
          if (task.status == "done")
            done++
          cpt++
        }
      });
    if (!cpt) this.advancement = 0
    else this.advancement = Math.trunc(done / (cpt - rej)  * 100)

    this.triggerShow();
  }

  public triggerShow(version?: string): void {
    console.log(this.project.tasks);

    if(this.showAll) {
      for (let i = 0; i < this.filteredAdvancementTasks.length; i++) {
        const element = this.filteredAdvancementTasks[i];
        if(element.version.id == version) {
          this.advancementTasks = element.tasks
        }
      }
    } else
      this.advancementTasks = this.project.tasks
  }
}
