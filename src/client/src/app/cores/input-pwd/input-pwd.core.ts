/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-06-02 13:20:49                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-07-26 15:16:29                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Toggles the visibility of the password.
*/

/* Imports */
import { Component, Input, Output, EventEmitter } from "@angular/core";
/***/

@Component({
  selector: "core-input-pwd",
  templateUrl: "./input-pwd.core.html",
  styleUrls: ["./input-pwd.core.scss"]
})
export class InputPwdCore {
  @Input() id: string = "";
  @Input() isLabel: boolean = false;
  @Input() label: string = "Label";
  @Input() placeholder: string = "";
  @Input() type: "default" | "primary" | "accent" = "primary";
  @Input() size: "small" | "medium" | "large" = "medium";
  @Input() other: string = "";
  @Input() is: string = "text";
  @Input() autocomplete: string = "";
  @Input() disabled: boolean = false;
  @Input() value: string = "";
  @Output() valueChange = new EventEmitter();
  @Input() showPassword: boolean = false;

  /**
  * Toggles the visibility of the password.
  */
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  /***/
}
