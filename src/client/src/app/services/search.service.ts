/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-11-30 15:43:23                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-11-30 16:10:33                               *
 *****************************************************************************/

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  public state: boolean = false;

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
