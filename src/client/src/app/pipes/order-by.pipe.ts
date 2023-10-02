/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-10-02 18:29:09                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-02 18:43:19                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";
/***/

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
  transform(arr: unknown[], key: string, opt: "asc" | "desc"): any[] {
    return _.orderBy(arr, key, opt);
  }
}
