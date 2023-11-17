/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-11-15 14:37:36                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-11-16 18:28:43                              *
 ****************************************************************************/

import { Component } from "@angular/core";

@Component({
  selector: "component-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.scss"]
})
export class TooltipComponent {

  public tooltip!: string;
  public left: number = 0;
  public top: number = 0;
  public showTooltip: boolean = true;

}
