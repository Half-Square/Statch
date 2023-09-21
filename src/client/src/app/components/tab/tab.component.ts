/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-09-18 18:09:31                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-19 12:38:32                               *
 *****************************************************************************/

import { Component, Input } from '@angular/core';

/**
 * Tab component
 */
@Component({
  selector: 'component-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  /**
   * Indicates if tab's content is show or not.
   */
  @Input()
  active: boolean = false;

  /**
   * The title for the tabs
   */
  @Input()
  title?: string;
}
