/******************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-27 16:16:51                               *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-28 12:28:36                               *
 *****************************************************************************/

import { Component, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-level-section',
  templateUrl: './level-section.component.html',
  styleUrls: ['./level-section.component.scss']
})
export class LevelSectionComponent implements AfterContentChecked {
  @Input() level: string = "";
  @Output() levelChange: EventEmitter<string> = new EventEmitter<string>;

  public isEdit: boolean = false;

  public value: Array<{text: string}> = [{text: "normal"}]

  public options: Array<{text: string}> = [
    { text: "low"},
    { text: "normal"},
    { text: "moderate"},
    { text: "high"}
  ]

  ngAfterContentChecked() {
    this.value = this.level ? [ { text: this.level }] : [{text: "normal"}];
  }

  public selectLevel(level: string ) {
    this.level = level;
    this.levelChange.emit(this.level)
    this.isEdit = false;
  }
}
