/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-08-30 16:34:39                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-06 12:57:37                               *
 *****************************************************************************/

import { Component, Input } from "@angular/core";

/**
 * Custom badge component
 */
@Component({
  selector: "core-badge",
  templateUrl: "./badge.core.html",
  styleUrls: ["./badge.core.scss"]
})
export class BadgeCore {
  /**
   * Label text.
   */
  @Input()
    label: string = "Label";

  /**
   * Style of the badge.
   */
  @Input()
    style: "default" | "positive" | "informative" | "warn" | "error" | "passive" = "default";

  /**
   * Size of the badge.
   */
  @Input()
    size: "small" | "medium" | "large" = "medium";

  /**
   * Other CSS classes to apply to the badge.
   */
  @Input()
    other: string = "";
}
