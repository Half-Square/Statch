/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-12 14:26:16                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-17 01:00:02                              *
 ****************************************************************************/

import { Component, Input } from "@angular/core";

/**
 * Interface of breadcrumbs with path and name (label text).
 */
interface CrumbsInterface {
  name: string,
  path: string,
  collection: string
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

  public reject: string[] = ["labels", "smtp", "users"];

}
