/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-30 11:58:04                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-12-04 18:50:56                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { Component, HostListener } from "@angular/core";
import { environment as env } from "./../environments/environment";
import { Router } from "@angular/router";
/***/

/* Services */
import { ILoggedUser, UserService } from "./services/user.service";
import { NavService } from "./sections/navigation/nav.service";
import { RequestService } from "./services/request.service";
import { SocketService } from "./services/socket.service";
import { ShortcutsService } from "./services/shortcuts.service";
import { SearchService } from "./services/search.service";
/***/

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public onSearch: boolean = false;

  constructor(public user: UserService,
              public nav: NavService,
              private router: Router,
              private request: RequestService,
              private socket: SocketService,
              private shorcuts: ShortcutsService,
              public search: SearchService) {
    if (env.production) { // Recover system settings, only for production
      fetch("/api/settings/sys", {headers: {"Content-Type": "application/json"}})
        .then((ret) => {
          ret.json()
            .then((json) => {
              if (json.api && json.host && json.socket) {
                env.serverUrl = `${location.protocol}//${json["host"]}:${json["api"]}`;
                env.socketUrl = `${location.protocol}//${json["host"]}:${json["socket"]}`;

                this.socket.disconnect();
                if (this.user.isConnected()) this.socket.connect(`${json["host"]}:${json["socket"]}`, {}, this.user);

                if (json.mode == "demo") {
                  this.request.get("api/users/demo").then((ret) => {
                    this.user.setUser(ret as ILoggedUser);
                    this.router.navigateByUrl("/");
                  });
                }

              } else this.router.navigate(["/first-launch"]);
            });
        });
    }
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent): void {
    let shortcut = "";

    if(event.ctrlKey)
      shortcut += "Ctrl+";
    if(event.altKey)
      shortcut += "Alt+";
    if(event.shiftKey)
      shortcut += "Shift+";

    shortcut += event.key?.toUpperCase();

    if(shortcut)
      this.shorcuts.action(shortcut);
  }

}
