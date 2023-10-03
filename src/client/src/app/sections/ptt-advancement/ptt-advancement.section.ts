/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-09-21 14:12:54                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-09-21 14:12:54                               *
 *****************************************************************************/

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
