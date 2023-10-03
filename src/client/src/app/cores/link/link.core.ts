/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-08-30 16:39:39                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-29 15:52:59                              *
 ****************************************************************************/

import { Component, Input } from "@angular/core";

/**
 * Custom link component
 */
@Component({
  selector: "core-link",
  templateUrl: "./link.core.html",
  styleUrls: ["./link.core.scss"]
})
export class LinkCore {
  /**
   * Label text.
   */
  @Input()
    label: string;

  /**
   * Style of the link.
   */
  @Input()
    style: "default" | "primary" | "accent" | "warn" = "default";

  /**
   * Other CSS classes to apply to the link.
   */
  @Input()
    other: string = "";

  /**
   * Href of link.
   */
  @Input()
    link: string = "";
}
