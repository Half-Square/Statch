/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-09-15 12:52:21                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-15 12:52:21                               *
 *****************************************************************************/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  /**
   * Search Pipe
   * @param data - Object to check
   * @param query - Search text
   * @returns
   */
  transform(data: any[], query: string): any[] {
    if (!query || query.trim() === '') {
      return data;
    }

    const normalizedQuery = query.toLowerCase();

    const filteredData = data.filter((item) => {
      const itemValues = Object.values(item).map(value => String(value).toLowerCase());
      return itemValues.some(value => value.includes(normalizedQuery));
    });

    if (filteredData.length === 0) {
      return [{ name: 'No result' }];
    }

    return filteredData;
  }

}
