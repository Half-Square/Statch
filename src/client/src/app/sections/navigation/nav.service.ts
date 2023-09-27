/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-27 17:07:29                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-27 17:10:55                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Return navigation state
  * Toggle state
*/

/* Imports */
import { Injectable } from "@angular/core";
/***/

@Injectable({
  providedIn: "root"
})
export class NavService {
  private state: boolean = true;

  /**
  * Return navigation state
  */
  public getState(): boolean {
    return this.state;
  }
  /***/

  /**
  * Toggle state
  */
  public toggle(): void {
    this.state = !this.state;
  }
  /***/
}
