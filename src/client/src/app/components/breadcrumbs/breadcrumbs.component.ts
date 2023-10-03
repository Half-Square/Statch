/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-09-12 14:26:16                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-12 14:38:48                               *
 *****************************************************************************/

import { Component, Input } from "@angular/core";

/**
 * Interface of breadcrumbs with path and name (label text).
 */
interface CrumbsInterface {
  name: string,
  path: string
}

/**
 * Breadcrumbs component
 */
@Component({
  selector: "component-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent {

  /**
   * List of items for the breadcrumbs hierarchy.
   */
  @Input()
    crumbs: Array<CrumbsInterface> = [];

}
