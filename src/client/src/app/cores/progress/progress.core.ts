/******************************************************************************
 * @Author                : 0K0<qdouvillez@gmail.com>                         *
 * @CreatedDate           : 2023-06-06 12:56:44                               *
 * @LastEditors           : 0K0<qdouvillez@gmail.com>                         *
 * @LastEditDate          : 2023-06-06 13:04:29                               *
 *****************************************************************************/

import { Component, Input } from '@angular/core';

/**
 * Represents a progress component.
 */
@Component({
  selector: 'core-progress',
  templateUrl: './progress.core.html',
  styleUrls: ['./progress.core.scss']
})
export class ProgressCore {
  /**
   * The unique identifier for the progress component.
   */
  @Input()
  id: string = '';

  /**
   * The value to set.
   */
  private _value: number = 0;

  /**
   * Sets the value of the progress component.
   * @param value - The value to set.
   */
  @Input()
  set value(value: number) {
    if (value > 100) {
      this._value = 100;
    } else if (value < 0) {
      this._value = 0;
    } else {
      this._value = value;
    }
  }

  /**
   * Gets the value of the progress component.
   * @returns The value of the progress component.
   */
  get value(): number {
    return this._value;
  }

  /**
   * Indicates whether to show the value of the progress component.
   */
  @Input()
  showValue: boolean = true;

  /**
   * The label for the progress component.
   */
  @Input()
  label: string = 'Label';

  /**
   * Indicates whether the label is displayed.
   */
  @Input()
  isLabel: boolean = false;
}
