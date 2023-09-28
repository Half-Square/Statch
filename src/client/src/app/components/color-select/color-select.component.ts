/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-28 16:43:50                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-28 17:29:38                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
/***/

@Component({
  selector: "component-color-select",
  templateUrl: "./color-select.component.html",
  styleUrls: ["./color-select.component.scss"]
})
export class ColorSelectComponent {
  @Input() value: string = "#f9f9f9";
  @Output() valueChange = new EventEmitter<string>();

  public showMenu: boolean = false;
  public colorOptions: string[] = [
    "#f9f9f9",
    "#308dff",
    "#3cb371",
    "#ffee05",
    "#ffa500",
    "#ff1100",
    "#ee82ee",
    "#6a5acd"
  ];
}
