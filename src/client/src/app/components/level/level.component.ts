/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-06 14:42:34                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-29 12:39:33                              *
 ****************************************************************************/

import { Component, Input, OnInit } from "@angular/core";

/**
 * Level component
 */
@Component({
  selector: "component-level",
  templateUrl: "./level.component.html",
  styleUrls: ["./level.component.scss"]
})
export class LevelComponent implements OnInit {

  /**
   * The level of importance.
   */
  @Input()
    level: "low" | "normal" | "moderate" | "high" | string = "low";

  /**
   * Label text of component.
   */
  public label: "Low" | "Normal" | "Moderate" | "High" = "Low";

  /**
   * Style of component
   */
  public style: "passive" | "informative" | "warn" | "error" = "passive";

  /**
   * Switch case of level component.
   */
  ngOnInit(): void {
    switch (this.level) {
    case "low":
      this.label = "Low";
      this.style = "passive";
      break;
    case "normal":
      this.label = "Normal";
      this.style = "informative";
      break;
    case "moderate":
      this.label = "Moderate";
      this.style = "warn";
      break;
    case "high":
      this.label = "High";
      this.style = "error";
      break;
    }
  }
}
