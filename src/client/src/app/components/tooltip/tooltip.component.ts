/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-11-15 14:37:36                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-22 15:45:15                              *
 ****************************************************************************/

import { Input, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "component-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.scss"]
})
export class TooltipComponent {

  @Input() public set tooltip(value: string) {
    this._tooltip = value;
    this.updateTooltip();
  }

  public get tooltip(): string {
    return this._tooltip;
  }

  private _tooltip!: string;
  public left: number = 0;
  public top: number = 0;
  public right: number = 0;
  public showTooltip: boolean = true;
  public width: number = this.textWidth() + 16;
  public triangle: string = "calc(50% - 5px)";

  @ViewChild("tooltipEl") tooltipEl!: ElementRef;

  private updateTooltip(): void {
    this.width = this.textWidth() + 16 + 8;
  }

  private textWidth(): number {
    let fontFamily = "Arial";
    let fontSize = "12px";
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context!.font = fontSize + " " + fontFamily;
    let metrics = context!.measureText(this.tooltip);
    return metrics.width;
  }
}
