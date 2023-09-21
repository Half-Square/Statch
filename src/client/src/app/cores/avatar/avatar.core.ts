/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-09-05 10:17:26                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-06 12:58:02                               *
 *****************************************************************************/

import { Component, Input } from "@angular/core";

@Component({
  selector: "core-avatar",
  templateUrl: "./avatar.core.html",
  styleUrls: ["./avatar.core.scss"]
})
export class AvatarCore {
  /**
   * Label text.
   */
  @Input()
    label: string = "Label";

  /**
   * Show label or not.
   */
  @Input()
    showLabel: boolean = true;

  /**
   * Size of the avatar.
   */
  @Input()
    size: "small" | "medium" | "large" = "medium";

  /**
   * Image's link of the avatar
   */
  @Input()
    imgLink: string = "";

  /**
   * Other CSS classes to apply to the avatar.
   */
  @Input()
    other: string = "";

  /**
   * Function who return first letter of string
   * @param name Label string
   * @returns - First letter of string
   */
  public getFirstLetter(name: string): string {
    return Array.from(name)[0];
  }
}
