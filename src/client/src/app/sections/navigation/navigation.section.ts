/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-20 16:04:41                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-21 18:05:25                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import pkg from "../../../../package.json";
/***/

@Component({
  selector: "section-navigation",
  templateUrl: "./navigation.section.html",
  styleUrls: ["./navigation.section.scss"]
})
export class NavigationSection implements OnInit {
  private history: string[] = [];
  private forwardStack: string[] = [];
  public disabledForward: boolean = true;
  public disabledBack: boolean = true;
  public version!: string | undefined;

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        const previousUrl = this.history[this.history.length - 1];
        if (currentUrl !== previousUrl) {
          this.history.push(currentUrl);
        }
        this.checkForward();
        this.checkBack();
      }
    });
  }

  public ngOnInit(): void {
    this.history.push(this.router.url);
    this.version = pkg.version;
  }

  public onBack(): void {
    this.checkBack();
    if (this.history.length > 1) {
      this.forwardStack.push(this.history.pop() as string);
      const previousUrl = this.history[this.history.length - 1];
      this.router.navigateByUrl(previousUrl);
    } else {
      this.location.back();
    }
  }

  public onForward(): void {
    if (this.forwardStack.length > 0) {
      const nextUrl = this.forwardStack.pop() as string;
      this.history.push(nextUrl);
      this.router.navigateByUrl(nextUrl);
    } else {
      this.checkForward();
      this.location.forward();
    }
  }

  private checkForward(): void {
    this.disabledForward = this.forwardStack.length === 0;
  }

  private checkBack(): void {
    this.disabledBack = this.history.length <= 1;
  }
}
