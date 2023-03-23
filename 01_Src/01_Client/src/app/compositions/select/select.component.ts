/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-23 15:26:45                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-03-23 17:43:40                               *
 *                                                                            *
 *****************************************************************************/

interface selectedOption {
  text: string,
  icon?: string
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  constructor() {
    this.options = [{text: "toto"}, {text: "In progress", icon: "progress"}, {text: "toto", icon: "icon"}]
    this.filteredOptions = []
    this.searchTerm = ""
    this.selectedOption = {} as selectedOption
    this.isOpen = false
  }

  filteredOptions: Array<selectedOption>;
  searchTerm: string;
  selectedOption: selectedOption;
  isOpen: boolean;

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

  @Input() type: string = "prm";
  @Input() size: string = "md";
  @Input() other: string = "";

  @Input() disabled: boolean = false;

  @Input() options: Array<selectedOption>;
  @Output() optionSelected = new EventEmitter<selectedOption>();
}
