/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-06-05 17:10:01                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2025-05-19 16:03:41                              *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Represents a checkbox component.
 */
@Component({
  selector: "core-checkbox",
  templateUrl: "./checkbox.core.html",
  styleUrls: ["./checkbox.core.scss"]
})
export class CheckboxCore {
  @Input() label: string = "";
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  /**
  * Toggles the checked state of the checkbox and emits the updated value.
  */
  public toggleChecked(): void {
    if(!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
  /***/
}
