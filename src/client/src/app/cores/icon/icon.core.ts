/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-09-05 11:30:40                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-06 12:56:38                              *
 ****************************************************************************/

import { Component, Input } from "@angular/core";

/**
 * Icon component
 *
 * ``hs ng core icon``
 */
@Component({
  selector: "core-icon",
  templateUrl: "./icon.core.html",
  styleUrls: ["./icon.core.scss"]
})
export class IconCore {
  /**
   * Name of icon to display
   */
  @Input()
    icon: string = "";

  /**
  * Other class to add
  */
  @Input()
    other: string = "";
}
