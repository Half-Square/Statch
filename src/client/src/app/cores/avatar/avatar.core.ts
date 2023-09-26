/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-05 10:17:26                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-26 11:09:07                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Function who return first letter of string
*/

/* Imports */
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
/***/

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
    label: string | null = "Label";

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
    if(!this.imgLink && changes["label"].currentValue) {
      this.printLabel = this.getFirstLetter(changes["label"].currentValue);
    }
  }

  /**
   * Function who return first letter of string
   * @param name Label string
   * @returns - First letter of string
   */
  public getFirstLetter(name: string): string {
    if(name && name != "")
      return Array.from(name)[0];
    return "";
  }
  /***/
}
