/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-06-02 13:20:49                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-06 12:55:44                              *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Component representing a password input field with toggleable visibility.
 */
@Component({
  selector: "core-input-pwd",
  templateUrl: "./input-pwd.core.html",
  styleUrls: ["./input-pwd.core.scss"]
})
export class InputPwdCore {
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

  /**
   * Flag indicating whether the password is visible or hidden.
   */
  @Input()
    showPassword: boolean = false;

  /**
   * Toggles the visibility of the password.
   */
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
