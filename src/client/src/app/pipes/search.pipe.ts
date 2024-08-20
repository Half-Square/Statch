/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-15 12:52:21                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-19 17:51:09                              *
 ****************************************************************************/

import { Pipe, PipeTransform } from "@angular/core";

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Pipe({
  name: "search",
  pure: false
})
export class SearchPipe implements PipeTransform {

  /**
   * Search Pipe
   * @param data - Object to check
   * @param query - Search text
   * @param noResult - Optional value no result
   * @returns
   */
  transform(data: any[],
    query: string,
    noResult?: boolean): any[] {

    if (!query || query.trim() === "") {
      return data;
    }

    const normalizedQuery = query.toLowerCase();

    const filteredData = data.filter((item) => {
      const itemValues = Object.values(item).map(value => String(value).toLowerCase());
      return itemValues.some(value => value.includes(normalizedQuery));
    });

    if(filteredData.length === 0 && noResult) {
      return [{id: query, name: query, fromSearch: true}];
    }

    if (filteredData.length === 0) {
      return [{id: "no", name: "No result", fromSearch: true }];
    }

    return filteredData;
  }

}
