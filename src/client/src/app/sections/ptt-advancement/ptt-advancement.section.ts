/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-21 14:12:54                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-11-16 15:20:32                              *
 ****************************************************************************/

import { Component, Input } from "@angular/core";

@Component({
  selector: "section-ptt-advancement",
  templateUrl: "./ptt-advancement.section.html",
  styleUrls: ["./ptt-advancement.section.scss"]
})
export class PttAdvancementSection {
  @Input()
    value: number = 0;
}
