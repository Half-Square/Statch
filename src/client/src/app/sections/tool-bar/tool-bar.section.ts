/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-27 14:35:32                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-27 17:46:58                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component, OnDestroy, OnInit } from "@angular/core";
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
  public routes: {name: string, path: string}[] = [];
  public menuOptions: boolean = false;
  private sub: Subscription;

  constructor(private router: Router,
              public nav: NavService) {
  }

  ngOnInit(): void {
    this.setCrumbs(this.router.url);

    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setCrumbs(event.url);
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
    this.routes = [{name: "Home", path: "projects"}];

    url.split("/").filter((el) => el != "").map((el, i) => {
      this.routes.push({
        name: el,
        path: this.routes[i].path+(el !== this.routes[i].path ? "/"+el : "")
      });
    });
  }
  /***/
}
