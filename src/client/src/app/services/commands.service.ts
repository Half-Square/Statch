/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-11-30 14:48:32                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-08-15 16:13:25                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
  * Logout command
  * Navbar toggle open/close command
  * Searchbar toggle open/close command
  * Navigate to settings command
  * Navigate to projects command
  * Navigate to activities
  * Navigate to profile
  * Add new project/task/ticket
  * Toggle self assignment
  * Save current item
  * Search current id and send to clipboard function
  * Search current url and send to clipboard function
  * Copy data to clipboard
  * Navigate to parent
  * Navigate to the first child
*/

/* Imports */
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
/***/

/* Interfaces */
import { IProjects, ITasks, ITickets } from "src/app/interfaces";
/***/

/* Services */
import { NavService } from "../sections/navigation/nav.service";
import { PttService } from "./ptt.service";
import { RecoveryService } from "./recovery.service";
import { RequestService } from "./request.service";
import { SearchService } from "./search.service";
import { ToastService } from "./toast.service";
import { UserService, ILoggedUser } from "./user.service";
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
              private recovery: RecoveryService,
              private api: RequestService,
              private toast: ToastService) {}

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

  /**
  * Toggle self assignment
  */
  public assignSelf(): void {
    let u = this.user.getUser() as ILoggedUser;
    const route = this.route.snapshot.children[0].params;
    let type = route["type"];
    let id = route["id"];

    let item;
    if(Object.keys(route).length > 0) {
      this.recovery.getSingleSync(type, id).then((res: IProjects | ITasks | ITickets) => {
        item = res;
        if (u.id) {
          let i = _.findIndex(item.assignments, {userId: u.id});

          if (i != -1) item.assignments.splice(i, 1);
          else item.assignments.push({userId: u.id});

          this.saveItem(item);
        }
      });
    }
  }
  /***/

  /**
  * Save current item
  */
  private saveItem(item: IProjects | ITasks | ITickets): void {
    const route = this.route.snapshot.children[0].params;
    let type = route["type"];
    let id = route["id"];
    this.api.put(`api/${type}/${id}`, item, this.user.getUser()?.token)
      .then(() => {
        this.recovery.updateData(item, type);
        this.toast.print(`${_.capitalize(type.slice(0, -1))} ${id} has been saved`, "success");
      });
  }
  /***/

  /**
  * Search current id and send to clipboard function
  */
  public copyId(): void {
    const route = this.route.snapshot.children[0].params;
    let id = route["id"];
    if(Object.keys(route).length > 0)
      this.clipboard(id);
  }
  /***/

  /**
  * Search current url and send to clipboard function
  */
  public copyUrl(): void {
    const route = window.location.href;
    this.clipboard(route);
  }
  /***/

  /**
  * Copy data to clipboard
  * @param data - Data to copy
  */
  private clipboard(data: string): void {
    if(navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data)
        .then(() => {
          this.toast.print("Copied to clipboard", "info");
        })
        .catch(err => {
          this.toast.print("Unable to copy", "error");
          console.error(err);
        });
    } else {
      const copyHandler = (e: ClipboardEvent): void => {
        if (e.clipboardData) e.clipboardData.setData("text/plain", data);
        e.preventDefault();
        document.removeEventListener("copy", copyHandler);
        this.toast.print("Copied to clipboard", "info");
      };

      document.addEventListener("copy", copyHandler);
      document.execCommand("copy");
    }
  }
  /***/

  /**
  * Navigate to parent
  */
  public goParent(): void {
    const route = this.route.snapshot.children[0].params;

    let type = route["type"];
    let id = route["id"];

    this.recovery.getSingleSync(type, id)
      .then((res) => {
        if(res.projectId) this.router.navigate([`/projects/${res.projectId}`]);
        if(res.taskId) this.router.navigate([`/tasks/${res.taskId}`]);
      });
  }
  /***/

  /**
  * Navigate to the first child
  */
  public goChild(): void {
    const route = this.route.snapshot.children[0].params;
    let type = route["type"];
    let id = route["id"];
    let childrenType = type === "projects" ? "tasks" : "tickets";
    let childs: ITasks[] | ITickets[];
    this.recovery.get(childrenType).subscribe((el) => {
      childs = _.filter(el, (c) => {
        return id === (childrenType == "tasks" ? (c as ITasks).projectId : (c as ITickets).taskId);
      });
      if(childs.length > 0)
        this.router.navigate([`/${childrenType}/${childs[0].id}`]);
    });
  }
  /***/
}
