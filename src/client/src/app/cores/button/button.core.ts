/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-08-21 16:28:49                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-08-30 11:07:36                              *
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
  @Input() id: string = "";
  @Input() label?: string = undefined;
  @Input() type: "basic" | "flat" | "stroked" = "basic";
  @Input() style: "default" | "primary" | "accent" | "warn" = "default";
  @Input() size: "small" | "medium" | "large" | "icon" = "medium";
  @Input() other: string = "";
  @Input() disabled: boolean = false;
}
