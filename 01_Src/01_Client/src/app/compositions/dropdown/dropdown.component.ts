/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-25 14:53:07                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-03-25 16:41:06                               *
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
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
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

export class DropdownComponent {
  constructor(private ref: ElementRef) {
    this.options = [{text: "New", icon: "new"}, {text: "In progress", icon: "progress"}, {text: "Completed", icon: "done"}, {text: "Rejected", icon: "reject"}, {text: "Pending", icon: "wait"}]
  }

  public filteredOptions: Array<selectedOption> = [];
  public isDropdownOpen: boolean = false;
  public searchText: string = '';
  public selectedOptions: Array<selectedOption> = [];

  @Input() multi: boolean = false;
  @Input() search: boolean = false;
  @Input() options: Array<selectedOption>;
  @Input() content: boolean = false;
  @Input() placeholder: string = "Test";

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.ref.nativeElement.contains(event.target) && !this.multi) this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: selectedOption) {
    this.selectedOptions = [option];
    this.toggleDropdown()
  }

  toggleSelectedOption(option: selectedOption) {
    const index = this.selectedOptions.indexOf(option);
    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1);
    }
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option => option.text.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
