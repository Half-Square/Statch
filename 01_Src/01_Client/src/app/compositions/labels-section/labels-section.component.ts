/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-14 16:41:30                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-15 17:03:55                               *
 *****************************************************************************/

import { Component, Input, Output, EventEmitter, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ApiService } from 'src/app/services/api/api.service';
import { FunctionService } from 'src/app/services/function/function.service';
import { LabelsInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-labels-section',
  templateUrl: './labels-section.component.html',
  styleUrls: ['./labels-section.component.scss'],
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
export class LabelsSectionComponent implements OnInit {
  constructor(private ref: ElementRef,
              private api: ApiService,
              private func: FunctionService) {

    api.request("GET", "labels").then((res) => {
      this.options = res;

      if(res.length == this.labels.length)
        this.noOptions = true
      else
        this.noOptions = false
    })

  }

  @ViewChild('dropdown') dropdown: ElementRef | undefined;

  ngOnInit() {
    window.addEventListener('resize', () => {
      if(this.isDropdownOpen)
        this.adjustPosition = this.func.isElementOffScreen(this.dropdown?.nativeElement);
    });
  }

  public filteredOptions: Array<LabelsInterface> = [];
  public isDropdownOpen: boolean = false;
  public noOptions: boolean = false;
  public adjustPosition: boolean = false;

  @Input() searchText: string = "";
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() labels: Array<LabelsInterface> = [];
  @Output() labelsChange = new EventEmitter<Array<LabelsInterface>>();

  @Input() options: Array<LabelsInterface> = [];
  @Input() placeholder: string = "Test";

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    setTimeout(() => {
      if(this.isDropdownOpen)
        this.adjustPosition = this.func.isElementOffScreen(this.dropdown?.nativeElement);
      else
        this.adjustPosition = false;
    }, 0);
  }

  toggleSelectedOption(option: LabelsInterface) {
    const index = this.labels.indexOf(option);
    if (index === -1) {
      this.labels.push(option);
    } else {
      this.labels.splice(index, 1);
    }

    if(this.options.length == 0) {
      this.noOptions = true;
    } else {
      this.noOptions = false;
    }
    this.labelsChange.emit(this.labels);
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option => option?.name?.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
