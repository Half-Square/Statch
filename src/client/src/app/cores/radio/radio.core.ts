/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-08-31 15:08:50                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-06 12:53:33                              *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Custom radio component
 */
@Component({
  selector: 'core-radio',
  templateUrl: './radio.core.html',
  styleUrls: ['./radio.core.scss']
})
export class RadioCore {
  /**
   * The label text for the radio.
   */
  @Input()
  label: string = 'Label';

  /**
   * Indicates whether the radio is checked or not.
   */
  @Input()
  checked: boolean = false;

  /**
   * The name for the radio.
   */
  @Input()
  name: string = 'toggle';

  /**
   * Style of the radio.
   */
  @Input()
  style: 'default' | 'primary' | 'accent' | 'warn' = 'default';

  /**
   * Event emitter triggered when the radio is toggled.
   * It emits the updated checked value.
   */
  @Output()
  checkedChange = new EventEmitter<boolean>();

  /**
   * Toggles the checked state of the radio and emits the updated value.
   */
  public toggleChecked() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
