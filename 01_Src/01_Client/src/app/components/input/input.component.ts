/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 13:23:02                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 13:31:17                               *
 *****************************************************************************/

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() id: string = "";

  @Input() isLabel: boolean = false;
  @Input() label: string = "md";
  @Input() placeholder: string = "";

  @Input() type: string = "prm";
  @Input() size: string = "md";
  @Input() other: string = "";

  @Input() is: string = "text";

  @Input() autocomplete: string = "";
  @Input() disabled: boolean = false;

  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
}
