/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-15 14:37:36                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-15 14:50:14                               *
 *****************************************************************************/

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "component-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.scss"]
})
export class TooltipComponent implements OnInit {

  public tooltip!: string;
  public left: number = 0;
  public top: number = 0;
  public opacity: number = 0;

  public ngOnInit(): void {
    console.log(this.tooltip);

  }
}
