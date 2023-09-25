/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-09-21 15:40:44                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-25 14:29:31                              *
 ****************************************************************************/

import { Component, Input } from "@angular/core";
@Component({
  selector: "section-ptt-list",
  templateUrl: "./ptt-list.section.html",
  styleUrls: ["./ptt-list.section.scss"]
})
export class PttListSection {
  @Input()
    link: string = "";

  @Input()
    elements: any = [];

  @Input()
    type: string = "";

}
