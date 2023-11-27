/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-12 14:26:16                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-11-17 09:31:37                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
*/

/* Imports */
import { Component, Input } from "@angular/core";
/***/

/* Interfaces */
export interface ICrumbs {
  name: string,
  path: string,
  collection?: string
}
/***/

@Component({
  selector: "component-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent {
  @Input() crumbs: ICrumbs[] = [];
}
