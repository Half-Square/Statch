/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-21 15:40:44                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-30 17:47:42                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component, Input } from "@angular/core";
/***/

@Component({
  selector: "section-ptt-list",
  templateUrl: "./ptt-list.section.html",
  styleUrls: ["./ptt-list.section.scss"]
})
export class PttListSection {
  @Input() link: string = "";
  @Input() elements: any[] = [];
  @Input() type: string = "";

}
