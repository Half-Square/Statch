/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-30 13:56:46                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-12-01 15:36:28                               *
 *****************************************************************************/

/* Imports */
import { Injectable } from "@angular/core";
/***/

/* Services */
import { CommandsService } from "./commands.service";
import { UserService } from "./user.service";
/***/

/* Intefaces */
export interface IShortcut {
  name: string,
  description: string,
  category: string
  action: string,
  shortcut: string,
}
/***/

@Injectable({
  providedIn: "root"
})
export class ShortcutsService {

  private shortcuts: IShortcut[] = [
    {
      name: "Log out",
      description: "Disconect to application",
      category: "General",
      action: "logout",
      shortcut: "Alt+Shift+Q"
    },
    {
      name: "Open/Close Navbar",
      description: "Reduce navbar",
      category: "General",
      action: "navbarState",
      shortcut: "Alt+R"
    },
    {
      name: "Search",
      description: "Open search",
      category: "Navigation",
      action: "openSearch",
      shortcut: "Alt+S"
    },
    {
      name: "Go to settings",
      description: "Go to settings",
      category: "Navigation",
      action: "goSetting",
      shortcut: "Alt+Shift+S"
    },
    {
      name: "Go to projects",
      description: "Goto p",
      category: "Navigation",
      action: "goProjects",
      shortcut: "Shift+D"
    },
    {
      name: "Go to activities",
      description: "Goto a",
      category: "Navigation",
      action: "goActivities",
      shortcut: "Shift+A"
    },
    {
      name: "Go to profile",
      description: "Goto p",
      category: "Navigation",
      action: "goProfile",
      shortcut: "Alt+Shift+P"
    },
    {
      name: "New project/task/ticket",
      description: "Create new project/task/ticket",
      category: "Actions",
      action: "new",
      shortcut: "Alt+N"
    },
    {
      name: "Assign to me",
      description: "Assign to me",
      category: "Actions",
      action: "assignSelf",
      shortcut: "Alt+I"
    },
    {
      name: "Copy id",
      description: "Copy",
      category: "Actions",
      action: "copyId",
      shortcut: "Alt+."
    },
    {
      name: "Copy url",
      description: "Copy",
      category: "Actions",
      action: "copyUrl",
      shortcut: "Ctrl+."
    },
    {
      name: "Go to parent",
      description: "",
      category: "Navigation",
      action: "goParent",
      shortcut: "Alt+ARROWUP"
    },
    {
      name: "Go to children",
      description: "",
      category: "Navigation",
      action: "goChild",
      shortcut: "Alt+ARROWDOWN"
    }
  ];

  constructor(private user: UserService,
              private commands: CommandsService) {}

  /**
   * Get all Shortcuts
   * @returns — Shortcut[]
   */
  public getShortcuts(): IShortcut[] {
    return this.shortcuts;
  }
  /***/

  /**
   * Action & active commands if is matched
   * @param shortcut — Keyboards event
   */
  public action(shortcut: string): void {
    const matchedAction = this.shortcuts.find(item => item.shortcut === shortcut);

    if(matchedAction && this.user.isConnected()) {
      if(matchedAction.action === "logout") this.commands.logout();
      if(matchedAction.action === "navbarState") this.commands.navToggle();
      if(matchedAction.action === "openSearch") this.commands.openSearch();
      if(matchedAction.action === "goSetting") this.commands.goSetting();
      if(matchedAction.action === "goProjects") this.commands.goProjects();
      if(matchedAction.action === "goActivities") this.commands.goActivities();
      if(matchedAction.action === "goProfile") this.commands.goProfile();
      if(matchedAction.action === "new") this.commands.new();
      if(matchedAction.action === "assignSelf") this.commands.assignSelf();
      if(matchedAction.action === "copyId") this.commands.copyId();
      if(matchedAction.action === "copyUrl") this.commands.copyUrl();
      if(matchedAction.action === "goParent") this.commands.goParent();
      if(matchedAction.action === "goChild") this.commands.goChild();
    }
  }
  /***/
}
