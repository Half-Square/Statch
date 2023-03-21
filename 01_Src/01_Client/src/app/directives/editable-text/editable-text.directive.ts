/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-21 15:04:38                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-21 19:32:26                               *
 *****************************************************************************/

import { Directive, Input, Output, EventEmitter, ElementRef, AfterContentChecked, HostListener } from '@angular/core';

@Directive({
  selector: '[edtTxt]'
})
export class EditableTextDirective implements AfterContentChecked {

  constructor(private el: ElementRef) {}

  @Input() isEdit: boolean = true;

  @Input() value: string = "";
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>;

  @HostListener('input') callOnChange(){
    this.value = this.el.nativeElement.textContent;
    this.valueChange.emit(this.value);
  }

  ngAfterContentChecked() {
    this.el.nativeElement.setAttribute('contenteditable', this.isEdit);
    this.writeValue(this.value);
  }

  writeValue(value: string) {
    this.el.nativeElement.textContent = value;
  }
}
