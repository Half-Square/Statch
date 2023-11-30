/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-30 14:48:32                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-30 17:10:48                               *
 *****************************************************************************/

/* Imports */
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
/***/

/* Services */
import { NavService } from "../sections/navigation/nav.service";
import { PttService } from "./ptt.service";
import { RecoveryService } from "./recovery.service";
import { SearchService } from "./search.service";
import { UserService } from "./user.service";
/***/

@Injectable({
  providedIn: "root"
})
export class CommandsService {
  public Onsearch: boolean = false;

  constructor(private user: UserService,
              private nav: NavService,
              private search: SearchService,
              private router: Router,
              private ptt: PttService,
              private route: ActivatedRoute,
              private recovery: RecoveryService) {}

  /**
   * Logout command
   */
  public logout(): void {
    this.user.logout();
  }
  /***/

  /**
   * Navbar toggle open/close command
   */
  public navToggle(): void {
    this.nav.toggle();
  }
  /***/

  /**
   * Searchbar toggle open/close command
   */
  public openSearch(): void {
    this.search.toggle();
  }
  /***/

  /**
   * Navigate to settings command
   */
  public goSetting(): void {
    this.router.navigate(["/settings"]);
  }
  /***/

  /**
   * Navigate to projects command
   */
  public goProjects(): void {
    this.router.navigate(["/projects"]);
  }
  /***/

  /**
   * Navigate to activities
   */
  public goActivities(): void {
    this.router.navigate(["/my-activities"]);
  }
  /***/

  /**
   * Navigate to profile
   */
  public goProfile(): void {
    this.router.navigate(["/profile"]);
  }
  /***/

  /**
   * Add new project/task/ticket
   */
  public new(): void {
    const route = this.route.snapshot.children[0].params;
    let type = route["type"];
    let id = route["id"];
    let childrenType = type === "projects" ? "tasks" : "tickets";

    if(Object.keys(route).length > 0 && route["type"] !== "tickets")
      this.ptt.createChild(type, id, childrenType);
    else if (type != "tickets")
      this.ptt.createProject();
  }
  /***/

}
