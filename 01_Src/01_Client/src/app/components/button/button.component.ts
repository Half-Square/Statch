/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 12:36:56                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 19:11:23                               *
 *****************************************************************************/

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label: string = "";

  @Input() type: string = "prm";
  @Input() size: string = "md";
  @Input() other: string = "";

  @Input() icon: string = "";
  @Input() iconPosition: string = "";
  @Input() disabled: boolean = false;

  @Output() callback: EventEmitter<any> = new EventEmitter();

  public classes: string = "";

  ngOnInit(): void {
    this.classes = this.type+" "+this.size+" "+this.other;
  }
}
