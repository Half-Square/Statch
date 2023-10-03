/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-03-20 16:31:02                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-03 10:51:00                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Services
*/

/* Imports */
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
/***/

/* Interfaces */
export interface ISearchResponse {
  id: string,
  name: string,
  type: string,
  icon: string,
}
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
/***/

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Component({
  selector: "component-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent {
  @Input() onSearch: boolean;
  @Output() onSearchChange = new EventEmitter<boolean>();
  public query: string = "";
  public results: Array<ISearchResponse> = []; // TO DO Cmd Interface
  public resultsSelected: any = [];
  public focusedResult: number = -1;
  public stepSearch: number = 0;
  public showBlock: boolean = false;
  public placeholderSearch: string = "Search projects or commands line...";

  constructor(private api: RequestService,
              private router: Router) {
  }


  /**
  * Updates the query data property and calls the search function with the updated query.
  */
  public handleInput(): void {
    this.search(this.query);
  }
  /***/

  /**
  * Sends request to the demo dataverse API to retrieve search results for the given query.
  * @param query - The search query entered by the user.
  */
  public search(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.post("api/search", { query: query })
        .then(data => {
          this.focusedResult = 0;
          this.results = data as ISearchResponse[];
          resolve(data);
        })
        .catch(error => {
          console.error(error);
          this.results = [];
          reject(error);
        });
    });
  }
  /***/

  /**
  * Increments the focusedResult data property by 1, unless it is already at the maximum value (the last result).
  *
  */
  public focusNextResult(): void {
    this.focusedResult = Math.min(this.focusedResult + 1, this.results.length - 1);
    this.followFocus("start");
  }
  /***/

  /**
  * Decrements the focusedResult data property by 1, unless it is already at the minimum value (the first result).
  */
  public focusPrevResult(): void {
    this.focusedResult = Math.max(this.focusedResult - 1, 0);
    this.followFocus("end");
  }
  /***/

  /**
  * sets the focusedResult data property to the given index.
  * @param index - The index of the result to focus
  */
  public focusResult(index: number): void {
    this.focusedResult = index;
  }
  /***/

  /**
  * Follow the selected result and scroll into element.
  */
  public followFocus(event: string): void {
    let focus = document.getElementsByClassName("focused");

    if(event === "end") {
      focus[0].scrollIntoView({ behavior: "smooth", block: "end" });
    }
    if(event === "start") {
      focus[0].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  /***/

  /**
  * Logs the selected result to the console.
  * @param {any} result - The result to be selected
  */
  public selectResult(result: any): void {
    let ptt = [ "project", "task", "ticket"];
    if (ptt.includes(result.type))
      this.redirect(result);
  }
  /***/

  public handle(event: any): void {
    if(!event.altKey && event.key === "Enter")  {
      this.handleEnter();
    } if (event.altKey && event.key === "Enter") {
      this.handleCommands();
    }
  }

  public redirect(result: any): void {
    this.router.navigate([result.type+"s", result.id ]);
    this.onSearchChange.emit(false);
  }

  public handleCommands(): void {
    if (this.focusedResult > -1 && this.results.length > 0) {
      this.commands(this.results[this.focusedResult]);
    }
  }

  public commands(result: any): void {
    this.placeholderSearch = "Search in...";
    this.resetInput();
    this.resultsSelected.push(result);
    this.stepSearch += 1;
  }

  public returnStep(step: number): void {
    if(step === 0) {
      this.resultsSelected = [];
      this.stepSearch = 0;
      return;
    }

    this.stepSearch -= this.resultsSelected.length - step;
    this.resultsSelected.splice(step);
  }

  private resetInput(): void {
    this.results = [];
    this.query = "";
  }

  /**
  * Selects the currently focused result if there is one.
  */
  public handleEnter(): void {
    if (this.focusedResult > -1 && this.results.length > 0) {
      this.redirect(this.results[this.focusedResult]);
    }
  }
  /***/
}
