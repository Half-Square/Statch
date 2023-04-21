/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-18 16:41:07                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-21 11:49:56                               *
 *****************************************************************************/

import { AfterViewInit, HostListener, Component, ElementRef, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommandService } from 'src/app/services/command/command.service';
import { LabelsInterface } from 'src/app/services/project-list/project-list.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-labels-setting',
  templateUrl: './labels-setting.component.html',
  styleUrls: ['./labels-setting.component.scss'],
  animations: [
    trigger('nested', [
      transition(':enter', [
        animate('100ms 100ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms 100ms ease-in-out', style({ opacity: 0, transform: "translateY(-16px)" }))
      ])
    ])
  ]
})
export class LabelsSettingComponent {
  constructor(private command: CommandService,
              private ref: ElementRef) {
    this.command.getLabels()
    .then((res) => {
      this.labels = res;
      console.log(res);
    });
    this.colorOptions = [
      "white",
      "blue",
      "green",
      "yellow",
      "orange",
      "red",
      "pink",
      "purple"
    ];
    let random = Math.floor(Math.random() * 8);
    this.selectColor = this.colorOptions[random];
  }

  @ViewChild('menu') menu?: ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.menu?.nativeElement.contains(event.target)) this.showMenu = false;
  }



  public labels: Array<LabelsInterface> = [];
  public colorOptions: Array<string> = [];
  public selectColor: string = "";
  public name: string = "";
  public desc: string = "";
  public showMenu: boolean = false;
  public showMenuEdit: boolean[] = [];
  public edit: boolean[] = [];

  public deleteLabel(labelId: any) {
    this.command.deleteLabel(labelId)
    .then((res) => {
      console.log("delete >> ", res);
    })
    this.labels = this.labels.filter((obj) => obj.id !== labelId);
  }

  public createLabel() {
    let label = {
      name: "Bug",
      color: "red",
      description: "blalal"
    }
    this.command.createLabel(label)
    .then((res) => {
      console.log("create >> ", res);
    })
  }

  public onSubmit(name: string, desc: string,  color: string) {
    let data: LabelsInterface = {
      name: name,
      color: color,
      description: desc
    }
    this.command.createLabel(data)
    this.labels.push(data);
  }

  public onEdit(label: LabelsInterface, index: number) {
    this.command.editLabel(label);
    this.edit[index] = !this.edit[index];
  }

  public toggleEdit(index: number, close?: boolean) {
    this.edit[index] = !this.edit[index]

    for (let i = 0; i < this.edit.length; i++) {
      if(close) {
        this.showMenuEdit[index] = false
        this.edit[i] = false
      }
      if(!close && i == index) {
        this.edit[i] = true
      } else {
        this.showMenuEdit[index] = false
        this.edit[i] = false
      }
    }
  }
}
