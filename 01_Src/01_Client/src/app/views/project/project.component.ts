/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 16:49:59                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-28 16:33:43                              *
 ****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandService } from 'src/app/services/command/command.service';
import { ProjectInterface, ProjectListService, VersionInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
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

  public id: string = "";
  public project: ProjectInterface = {} as ProjectInterface;

  public nbTicket: number = 0;
  public advancement: number = 0;

  public activity : any = [
    {img: "0", alt: "oui", name: "Randy", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
    {img: "0", alt: "oui", name: "Toto", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
    {img: "0", alt: "oui", name: "Tata", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
    {img: "0", alt: "oui", name: "Oui", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
  ];

  public comments: any = [
    {
      "id": "6389f8dcf9f5d32a98630c85",
      "author": {
        "_id": "638773e22ef2f4b210dc0fa7",
        "name": "Jean-Baptiste",
        "lastName": "BRISTHUILLE",
        "email": "jbristhuille@gmail.com",
        "image": ""
      },
      "created": "1669986524",
      "content": "Hello world"
    },
    {
      "id": "6389f8f48350bb19ecb8225f",
      "author": {
        "_id": "638773e22ef2f4b210dc0fa7",
        "name": "Jean-Baptiste",
        "lastName": "BRISTHUILLE",
        "email": "jbristhuille@gmail.com",
        "image": ""
      },
      "created": "1669986549",
      "content": "Hello world"
    },
  ];

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || "";
    console.log(this.getProjectVersion());

  }

  public saveProject() {
    this.command.editProject(this.project)
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
    if (this.project.tasks)
      this.project.tasks.forEach(task => {
        if (task.status == "rejected")
          rej++
        if (task.status == "done")
          done++
        cpt++
      });
    if (!cpt) this.advancement = 0
    else this.advancement = Math.trunc(done / (cpt - rej)  * 100)
  }
}
