/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-15 13:20:44                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-15 15:12:27                               *
 *****************************************************************************/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor() { }

  public isElementOffScreen(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const isVisible = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

    return !isVisible;
  }
}
