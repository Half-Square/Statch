/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-08-21 16:28:49                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-22 17:15:58                              *
 ****************************************************************************/

import { Component, Input } from "@angular/core";

/**
 * Custom button component.
 */
@Component({
  selector: "core-button",
  templateUrl: "./button.core.html",
  styleUrls: ["./button.core.scss"]
})
export class ButtonCore {
  /**
   * Identifier of the button.
   */
  @Input()
    id: string = "";

  /**
   * Label text.
   */
  @Input()
    label?: string = undefined;

  /**
   * Type of the button.
   */
  @Input()
    type: "basic" | "flat" | "stroked" = "basic";

  /**
   * Style of the button.
   */
  @Input()
    style: "default" | "primary" | "accent" | "warn" = "default";

  /**
   * Size of the button.
   */
  @Input()
    size: "small" | "medium" | "large" = "medium";

  /**
   * Other CSS classes to apply to the button.
   */
  @Input()
    other: string = "";

  /**
   * Indicates if button are disabled or not.
   */
  @Input()
    disabled: boolean = false;
}
