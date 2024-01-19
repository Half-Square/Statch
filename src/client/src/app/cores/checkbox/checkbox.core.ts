/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-06-05 17:10:01                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-19 16:26:47                              *
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
  /**
   * The label text for the checkbox.
   */
  @Input()
    label: string = "";

  /**
   * Indicates whether the checkbox is checked or not.
   */
  @Input()
    checked: boolean = false;

  @Input()
    disabled: boolean = false;

  /**
   * Event emitter triggered when the checkbox is toggled.
   * It emits the updated checked value.
   */
  @Output()
    checkedChange = new EventEmitter<boolean>();

  /**
   * Toggles the checked state of the checkbox and emits the updated value.
   */
  public toggleChecked(): void {
    if(!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
