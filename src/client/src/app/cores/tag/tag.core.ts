/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-08-21 17:12:01                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-06 12:53:05                               *
 *****************************************************************************/

import { Component, Input } from "@angular/core";

/**
 * Custom tag component.
 */
@Component({
  selector: "core-tag",
  templateUrl: "./tag.core.html",
  styleUrls: ["./tag.core.scss"]
})
export class TagCore {
  /**
   * Label text.
   */
  @Input()
    label: string = "Label";

  /**
   * Style of the tag.
   */
  @Input()
    style: "default" | "positive" | "informative" | "warn" | "error" | "passive" = "default";

  /**
   * Size of the tag.
   */
  @Input()
    size: "small" | "medium" | "large" = "medium";

  /**
   * Other CSS classes to apply to the tag.
   */
  @Input()
    other: string = "";
}
