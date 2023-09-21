/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-09-18 18:17:15                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-19 12:39:22                               *
 *****************************************************************************/

import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

/**
 * Tabs component
 */
@Component({
  selector: 'component-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  /**
   * QueryList to hold ContentChildren of type TabComponent
   * ContentChildren is used to query and access child TabComponents
   */
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  /**
   * Function to select a tab
   * @param selectedTab The TabComponent to be selected
   */
  selectTab(selectedTab: TabComponent) {
    this.tabs.forEach((tab) => {
      tab.active = tab === selectedTab;
    });
  }
}
