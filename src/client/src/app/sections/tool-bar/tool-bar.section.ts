/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-27 14:35:32                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-17 00:47:21                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
/***/

/* Services */
import { NavService } from "../navigation/nav.service";
/***/

@Component({
  selector: "section-tool-bar",
  templateUrl: "./tool-bar.section.html",
  styleUrls: ["./tool-bar.section.scss"]
})
export class ToolBarSection implements OnInit, OnDestroy {
  @Input() onSearch: boolean;
  @Output() onSearchChange = new EventEmitter<boolean>();

  public routes: {name: string, path: string, collection: string}[] = [];
  public menuOptions: boolean = false;
  private sub: Subscription;

  constructor(private router: Router,
              public nav: NavService) {
  }

  ngOnInit(): void {
    this.setCrumbs(this.router.url);

    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setCrumbs(this.router.url);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
  * Set crumbs
  * @param url - Current url
  */
  private setCrumbs(url: string): void {
    this.routes = [{name: "Home", path: "/", collection: "home"}];


    url.split("/").filter((el) => el != "").map((el, i) => {
      this.routes.push({
        name: el,
        path: this.routes[i].path+(el !== this.routes[i].path ? "/"+el : ""),
        collection: this.routes[i].path.replace(/\//g, "")
      });
    });
  }
  /***/
}
