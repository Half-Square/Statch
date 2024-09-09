/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-09-21 15:40:44                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-07-27 18:10:51                              *
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
      return _.find(this.versions, (version) => {
        if (( el as ITasks | ITickets).targetVersionId == version.id ||
              version.id === "" && el.targetVersionId === null) {
          return true;
        } else {
          return false;
        }
      }) ? true: false;
    } else return true;
  }
  /***/
}
