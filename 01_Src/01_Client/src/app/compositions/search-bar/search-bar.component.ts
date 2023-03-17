/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 15:11:14                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 15:13:21                               *
 *****************************************************************************/

import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    trigger('nested', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms 100ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms 100ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SearchBarComponent {

    public query: string = '';
    public results: Array<any> = []; // TO DO Cmd Interface
    public focusedResult: number = -1;


    /*
    * Name: ngOnInit
    *
    * Description: This function is called when the component is mounted. It focuses the input element.
    *
    */
    ngOnInit(): void {
      document.getElementById("inputSearch")!.focus();
    }
    /***/

    /*
     * Name: handleInput
     *
     * Description: This function is called when the input element's value changes. It updates the query data property and calls the search function with the updated query.
     *
    */
    public handleInput(): void {
      this.search(this.query);
    }
    /***/

    /*
     * Name: search
     *
     * Description: This function sends a fetch request to the demo dataverse API to retrieve search results for the given query.
     *
     * @param {string} query - The search query entered by the user.
     *
    */
    public search(query: string): Promise<Response> {
        return new Promise((resolve, reject) => {
          fetch(`https://demo.dataverse.org/api/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
              this.focusedResult = 0;
              this.results = data.data.items;
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

    /*
     * Name: focusNextResult
     *
     * Description: This function increments the focusedResult data property by 1, unless it is already at the maximum value (the last result).
     *
    */
    public focusNextResult(): void {
      this.focusedResult = Math.min(this.focusedResult + 1, this.results.length - 1);
      this.followFocus()
    }
    /***/

    /*
     * Name: focusPrevResult
     *
     * Description: This function decrements the focusedResult data property by 1, unless it is already at the minimum value (the first result).
     *
    */
    public focusPrevResult(): void {
      this.focusedResult = Math.max(this.focusedResult - 1, 0);
      this.followFocus()
    }
    /***/

    /*
     * Name: focusResult
     *
     * Description: This function sets the focusedResult data property to the given index.
     *
     * @param {number} index - The index of the result to focus
     *
    */
    public focusResult(index: number): void {
      this.focusedResult = index;
    }
    /***/

    /*
     * Name: followFocus
     *
     * Description: This function follow the selected result and scroll into element.
     *
     *
    */
    public followFocus(): void {
      const selectedResult = document.getElementById(`result-${this.focusedResult}`);
      if (selectedResult) {
        selectedResult.scrollIntoView({ behavior: 'smooth' });
      }
    }
    /***/

    /*
     * Name: selectResult
     *
     * Description: This function logs the selected result to the console.
     *
     * @param {any} result - The result to be selected
     *
    */
    public selectResult(result: any): void {
      console.log('clicked', result)
    }
    /***/

    /*
     * Name: handleEnter
     *
     * Description: This function selects the currently focused result if there is one.
     *
    */
    public handleEnter(): void {
      if (this.focusedResult > -1) {
        this.selectResult(this.results[this.focusedResult]);
      }
    }
}
