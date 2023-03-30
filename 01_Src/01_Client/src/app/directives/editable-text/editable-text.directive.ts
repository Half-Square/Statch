/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-21 15:04:38                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-22 14:53:28                              *
 ****************************************************************************/

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

  /**
  * @name writeValue
  * @descr init content with value
  *
  * @param value (String): value to write
  */
  public writeValue(value: string): void {
    this.el.nativeElement.textContent = value;
  }
  /***/
}
