/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2024-01-18 12:49:55                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-19 17:54:40                              *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "section-perms",
  templateUrl: "./perms.section.html",
  styleUrls: ["./perms.section.scss"]
})
export class PermsSection {
  @Input() perms: any;
  @Output() callback = new EventEmitter();

  /**
   * Update perms' data
   * @param key - Key of perm
   * @param parent - If this element are a parent
   */
  update(key: unknown, parent?: boolean): void {
    const value = this.perms[key as string];

    if(parent) {
      this.perms[key as string].view = !this.perms[key as string].view;
      this.setAllChildrenToFalse(value);
    } else {
      this.perms[key as string] = !this.perms[key as string];
    }

    this.callback.emit(this.perms);
  }
  /***/

  /**
   * Update from child
   * @param key - Key of perm
   * @param event - New data to update from child
   */
  updateFromChild(key: unknown, event: Event): void {
    this.perms[key as string] = event;
    this.callback.emit(this.perms);
  }
  /***/

  /**
   * Set all perms' children to false
   * @param obj - Perms' data
   */
  setAllChildrenToFalse(obj: any): void {
    Object.keys(obj).forEach(prop => {
      if(prop !== "view") {
        if (this.isObject(obj[prop])) {
          this.setAllChildrenToFalse(obj[prop]);
        } else {
          obj[prop] = false;
        }
      }
    });
  }
  /***/

  /**
   * Get value of specific perm
   * @param key - Key of perm
   * @param parent - If this element are a parent
   * @returns Value of perm
   */
  getPermissionValue(key: unknown, parent?: boolean): any {
    if(parent)
      return this.perms[key as string].view;
    else
      return this.perms[key as string];
  }
  /***/

  getLength(key: unknown): number {
    return Object.keys(this.perms[key as string]).length;
  }

  /**
   * Check if is disabled by view key
   * @param key - Key's perm
   * @returns Value of sibling "view"
   */
  isDisabled(key: unknown): boolean {
    if(this.hasChild(key))
      return this.perms[key as string].view;
    else
      return this.perms["view"];
  }
  /***/

  /**
   * Check if data is an object or not
   * @param value Perm's data
   * @returns
   */
  isObject(value: any): boolean {
    return typeof value === "object" && value !== null;
  }
  /***/

  /**
   * Check if element have children
   * @param key - Perm's key
   * @returns If have child or not
   */
  hasChild(key: unknown): boolean {
    const perms = this.perms[key as string];
    if (perms.hasOwnProperty("view"))
      return true;
    else
      return false;
  }
  /***/
}
