/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-21 15:40:44                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-03 12:10:18                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
*/

/* Imports */
import { Component, Input } from "@angular/core";
import * as _ from "lodash";
/***/

/* Interfaces */
import { ITasks, ITickets, IVersions } from "src/app/interfaces";
/***/

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Component({
  selector: "section-ptt-list",
  templateUrl: "./ptt-list.section.html",
  styleUrls: ["./ptt-list.section.scss"]
})
export class PttListSection {
  @Input() elements: any[] = [];
  @Input() type: string = "";
  @Input() versions: IVersions[] | null = null;
  @Input() other: string = ""; // Css class

  /**
  * Filter element by version
  * @param el - Element to check
  */
  filterByVersion(el: ITasks | ITickets): boolean {
    if (this.versions && this.versions.length > 0) {
      return _.find(this.versions, {
        id: (el as ITasks | ITickets).targetVersionId
      }) ? true: false;
    } else return true;
  }
  /***/
}
