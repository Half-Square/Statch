/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-20 16:31:02                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-20 18:26:08                              *
 *                                                                           *
 ****************************************************************************/

/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-17 15:11:14                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-20 16:30:58                              *
 *                                                                           *
 ****************************************************************************/

import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
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
        animate('100ms 100ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms 100ms ease-in-out', style({ opacity: 0, transform: "translateY(-32px)" }))
      ])
    ])
  ]
})
export class SearchBarComponent implements OnInit {



    public query: string = '';
    public results: Array<any> = []; // TO DO Cmd Interface
    public resultsSelected: any = [];
    public focusedResult: number = -1;
    public stepSearch: number = 0;


    /*
    * Name: ngOnInit
    *
    * Description: This function is called when the component is mounted. It focuses the input element.
    *
    */
    ngOnInit(): void {
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
      this.followFocus("start")
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
      this.followFocus("end")
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
    public followFocus(event: string): void {
      let focus = document.getElementsByClassName("focused")

      if(event === "end") {
        focus[0].scrollIntoView({ behavior: "smooth", block: "end" });
      }
      if(event === "start") {
        focus[0].scrollIntoView({ behavior: "smooth", block: "start" });
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
      this.commands(result)
      console.log('clicked', result)
    }
    /***/

    public redirect(result: any): void {
      console.log('clicked', result)
    }

    public commands(result: any): void {
      this.resetInput();
      this.resultsSelected.push(result)
      this.stepSearch += 1;
    }

    public returnStep(step: number): void {
      console.log(step);
      if(step === 0) {
        this.resultsSelected = [];
        this.stepSearch = 0;
        console.log('toto');

        return
      }
      this.stepSearch -= this.resultsSelected.length - step;
      this.resultsSelected.splice(step);

    }

    private resetInput(): void {
      this.results = [];
      this.query = '';
    }

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
