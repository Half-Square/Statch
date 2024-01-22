/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-27 14:35:32                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-30 15:51:43                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
*/

/* Imports */
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import * as _ from "lodash";
/***/

/* Services */
import { NavService } from "../navigation/nav.service";
import { RecoveryService } from "src/app/services/recovery.service";
/***/

/* Interfaces */
import { ICrumbs } from "src/app/components/breadcrumbs/breadcrumbs.component";
import { SearchService } from "src/app/services/search.service";
/***/

@Component({
  selector: "section-tool-bar",
  templateUrl: "./tool-bar.section.html",
  styleUrls: ["./tool-bar.section.scss"]
})
export class ToolBarSection implements OnInit, OnDestroy {
  @Input() onSearch: boolean;
  @Output() onSearchChange = new EventEmitter<boolean>();
  @ViewChild("menu") menu!: ElementRef;

  public routes: ICrumbs[] = [];
  public menuOptions: boolean = false;
  private sub: Subscription;

  constructor(private router: Router,
              public nav: NavService,
              public search: SearchService,
              public recovery: RecoveryService,
              private renderer: Renderer2) {
    this.renderer.listen("window", "click", (e: Event) => {
      if(this.menu &&
         this.menu.nativeElement &&
         !this.menu.nativeElement.contains(e.target))
        this.menuOptions = false;
    });
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
  private async setCrumbs(url: string): Promise<void> {
    let parts = url.split("/").filter((el) => el != "" && el != null && el != undefined);
    this.routes = [{name: "Home", path: ""}];

    if (parts[0] != "tasks" && parts[0] != "tickets") { // Default behavior
      parts.map((el, i) => {
        let type = this.routes[i].name == "projects" || this.routes[i].name == "tasks" || this.routes[i].name == "tickets" ? this.routes[i].name+"/" :  "";

        this.routes.push({
          name: el,
          path: `/${type}${el}`,
          collection: type != "" ? this.routes[i].name : undefined
        });
      });
    } else { // For PTT child only
      let tmp = [];
      let type = parts[0];
      let id = parts[1];

      while (true) {
        let item = await this.recovery.getSingleSync(type, id);

        tmp.unshift({
          name: item.id,
          path: `/${type}/${item.id}`,
          collection: type
        });

        if (type == "projects") {
          tmp.unshift({
            name: "projects",
            path: "/projects",
            collection: undefined
          });
          break;
        }

        type = type == "tickets" ? "tasks" : "projects";
        id = type == "projects" ? item.projectId : item.taskId;
      }

      this.routes = _.concat(this.routes, tmp);
    }
  }
  /***/
}
