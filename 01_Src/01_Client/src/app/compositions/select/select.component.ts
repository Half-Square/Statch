/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-23 15:26:45                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-24 16:06:02                              *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter, HostListener, ElementRef, AfterContentInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
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
export class SelectComponent implements AfterContentInit {
  constructor(private ref: ElementRef) {
    this.options = [
      {text: "New", icon: "new"},
      {text: "In progress", icon: "progress"},
      {text: "Completed", icon: "done"},
      {text: "Rejected", icon: "reject"},
      {text: "Pending", icon: "wait"}
    ]
  }

  @Input() id: string = "";

  @Input() isLabel: boolean = false;
  @Input() search: boolean = false;
  @Input() multiSelect: boolean = false;
  @Input() placeholder: string = "Test";
  @Input() content: boolean = false;

  @Input() type: string = "prm";
  @Input() size: string = "md";
  @Input() other: string = "";

  @Input() disabled: boolean = false;

  @Input() options: Array<{text: string, icon?: string}>;

  @Input() value: {text: string, icon?: string} = {text: '', icon: ''};
  @Output() valueChange = new EventEmitter<{text: string, icon?: string}>();

  public filteredOptions: Array<{text: string, icon?: string}> = [];
  public searchTerm: string = "";
  public isOpen: boolean = false;
  public load: boolean = true;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.ref.nativeElement.contains(event.target))
      this.isOpen = false;
  }

  ngAfterContentInit() {
    this.load = false;
  }

  public filterOptions() {
    this.filteredOptions = this.options.filter(option => {
      option.text.toLowerCase().includes(this.searchTerm.toLowerCase())
    });
  }

  public selectOption(option: {text: string, icon?: string}) {
    this.value = option;
    this.valueChange.emit(this.value);

    this.searchTerm = '';
    this.filteredOptions = this.options;
    this.isOpen = false;
  }
}
