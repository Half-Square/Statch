/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 16:49:59                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-18 16:56:00                               *
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandService } from 'src/app/services/command/command.service';
import { ProjectInterface, ProjectListService } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              public command: CommandService) {
    ProjectListService.projectChange.subscribe((value) => {
      this.project = value;
    })
  }

  public id: string = "";
  public project: ProjectInterface = {} as ProjectInterface;

  public nbTicket: number = 0;

  public newCommentContent: string = "";

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
    this.project = await ProjectListService.getProject(this.id);
  }

  public newComment() {
    console.log(this.newCommentContent);
  }
}
