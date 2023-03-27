/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-25 14:53:07                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-27 16:33:17                              *
 ****************************************************************************/

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
    this.options = [
      {text: "New", icon: "new"},
      {text: "In progress", icon: "progress"},
      {text: "Completed", icon: "done"},
      {text: "Rejected", icon: "reject"},
      {text: "Pending", icon: "wait"}
    ]
  }

  public filteredOptions: Array<{text: string, icon?: string}> = [];
  public isDropdownOpen: boolean = false;
  public searchText: string = '';

  @Input() values: Array<{text: string, icon?: string}> = [];
  @Output() valuesChange = new EventEmitter<Array<{text: string, icon?: string}>>();

  @Input() multi: boolean = false;
  @Input() search: boolean = false;
  @Input() options: Array<{text: string, icon?: string}>;
  @Input() contentOnly: boolean = false;
  @Input() placeholder: string = "Test";
  @Input() autoAdd: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.ref.nativeElement.contains(event.target) && !this.multi) this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: {text: string, icon?: string}) {
    this.values = [option];
    this.toggleDropdown()
    this.valuesChange.emit(this.values);
  }

  toggleSelectedOption(option: {text: string, icon?: string}) {
    const index = this.values.indexOf(option);
    if (index === -1) {
      this.values.push(option);
    } else {
      this.values.splice(index, 1);
    }
  }

  addOption() {
    let obj: {text: string, icon?: string} = { text: this.searchText };
    this.options.push(obj);
    this.searchText = "";
    if(this.multi) {
      this.values.push(obj);
      this.toggleDropdown();
    } else {
      this.values = [obj];
      this.toggleDropdown();
    }
    this.valuesChange.emit(this.values);
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option => option.text.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
