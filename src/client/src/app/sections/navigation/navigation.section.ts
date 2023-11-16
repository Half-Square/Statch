/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-09-20 16:04:41                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-11-16 21:15:23                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component } from "@angular/core";
import { Location, LocationStrategy } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
/***/

@Component({
  selector: "section-navigation",
  templateUrl: "./navigation.section.html",
  styleUrls: ["./navigation.section.scss"]
})
export class NavigationSection {

  private history: number[] = [];
  private currentIndex = 0;
  public lastBackLocation: boolean = false;
  public lastNextLocation: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private locationStrategy: LocationStrategy) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const state = this.locationStrategy.getState() as {navigationId: number};
        if(!this.history.includes(state.navigationId)) {
          this.history.push(state.navigationId);
          this.lastBackLocation = this.canGoBack();
        }
      }
    });
  }

  public onForward(): void {
    this.locationStrategy.forward();
    this.lastNextLocation = this.canGoForward();
  }

  public onBack(): void {
    this.locationStrategy.back();
    this.lastBackLocation = this.canGoBack();
  }

  private canGoBack(): boolean {
    const state = this.location.getState() as {navigationId: number};
    console.log(state.navigationId, this.locationStrategy);
    return state.navigationId > 1;
  }

  private canGoForward(): boolean {
    const state = this.location.getState() as {navigationId: number};
    return state.navigationId < this.history.length;
  }
}
