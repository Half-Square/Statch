/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-23 15:26:45                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-03-24 11:44:37                               *
 *                                                                            *
 *****************************************************************************/

interface selectedOption {
  text: string,
  icon?: string
}

import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
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
export class SelectComponent {
  constructor(private ref: ElementRef) {
    this.options = [{text: "New", icon: "new"}, {text: "In progress", icon: "progress"}, {text: "Completed", icon: "done"}, {text: "Rejected", icon: "reject"}, {text: "Pending", icon: "wait"}]
  }

  public filteredOptions: Array<selectedOption> = [];
  public searchTerm: string = "";
  public selectedOption: selectedOption = {} as selectedOption;
  public isOpen: boolean = false;
  private onOver: boolean = false;

  filterOptions() {
    this.filteredOptions = this.options.filter(option => option.text.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  selectOption(option: selectedOption) {
    this.optionSelected.emit(option);
    this.selectedOption = {
      text: option.text,
      icon: option.icon
    };
    this.searchTerm = '';
    this.filteredOptions = this.options;
    this.isOpen = false;
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

  @Input() options: Array<selectedOption>;
  @Output() optionSelected = new EventEmitter<selectedOption>();

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.ref.nativeElement.contains(event.target)) this.isOpen = false;
  }
}
