/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-25 14:53:07                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-04-14 13:39:14                              *
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

  @Input() searchText: string = "";
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() values: Array<{text: string, icon?: string}> = [];
  @Output() valuesChange = new EventEmitter<Array<{text: string, icon?: string}>>();

  @Input() multi: boolean = false;
  @Input() search: boolean = false;
  @Input() options: Array<{text: string, icon?: string}> | Array<any>;
  @Input() contentOnly: boolean = false;
  @Input() placeholder: string = "Test";

  @Input() autoAdd: boolean = false;
  @Output() addOptionCb: EventEmitter<void> = new EventEmitter<void>();

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

  async addOption() {
    if (this.searchText) {
      let obj: {text: string, icon?: string} = { text: this.searchText };
      this.options.push(obj);

      this.addOptionCb.emit()

      this.searchText = "";
      if(this.multi) {
        this.values.push(obj);
        this.toggleDropdown();
      } else {
        this.values = [obj];
        this.toggleDropdown();
      }
    }
  }

  filterOptions() {
    if(this.options[0].text)
      this.filteredOptions = this.options.filter(option => option.text.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  public isAddable(): boolean {
    if (this.searchText.length < 1)
      return false;

    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].text == this.searchText)
        return false;
    }
    return true
  }
}
