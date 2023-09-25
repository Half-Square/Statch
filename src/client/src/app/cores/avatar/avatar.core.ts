/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-09-05 10:17:26                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-25 16:18:16                              *
 ****************************************************************************/

import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "core-avatar",
  templateUrl: "./avatar.core.html",
  styleUrls: ["./avatar.core.scss"]
})
export class AvatarCore implements OnChanges {
  /**
   * Label text.
   */
  @Input()
    label: any = "Label";

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

  public printLabel: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(!this.imgLink && changes["label"].currentValue) this.printLabel = this.getFirstLetter(changes["label"].currentValue);
  }

  /**
   * Function who return first letter of string
   * @param name Label string
   * @returns - First letter of string
   */
  public getFirstLetter(name: string): string {
    console.log(name);

    if(name && name != "")
      return Array.from(name)[0];
    return "";
  }

}
