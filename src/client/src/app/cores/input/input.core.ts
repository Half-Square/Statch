/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-06-02 16:16:20                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-06 12:56:24                              *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Custom input component.
 */
@Component({
  selector: "core-input",
  templateUrl: "./input.core.html",
  styleUrls: ["./input.core.scss"]
})
export class InputCore {
  /**
   * Identifier of the input.
   */
  @Input()
    id: string = "";

  /**
   * Indicates whether a label is displayed.
   */
  @Input()
    isLabel: boolean = false;

  /**
   * Label text.
   */
  @Input()
    label: string = "Label";

  /**
   * Placeholder of the input.
   */
  @Input()
    placeholder: string = "";

  /**
   * Type of the input.
   */
  @Input()
    type: "default" | "primary" | "accent" = "primary";

  /**
   * Size of the input.
   */
  @Input()
    size: "small" | "medium" | "large" = "medium";

  /**
   * Other CSS classes to apply to the input.
   */
  @Input()
    other: string = "";

  /**
   * HTML input type.
   */
  @Input()
    is: string = "text";

  /**
   * Autocomplte values of the input.
   */
  @Input()
    autocomplete: string = "";

  /**
   * Indicates if input are disabled or not.
   */
  @Input()
    disabled: boolean = false;

  /**
   * Value of the input.
   */
  @Input()
    value: string = "";

  /**
   * Event emitted when the value of the input changes.
   */
  @Output()
    valueChange: EventEmitter<any> = new EventEmitter();
}
