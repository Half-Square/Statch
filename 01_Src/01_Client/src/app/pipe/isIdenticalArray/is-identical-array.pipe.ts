/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-15 15:35:50                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-15 15:59:23                               *
 *****************************************************************************/

import { Pipe, PipeTransform } from '@angular/core';
import { LabelsInterface } from 'src/app/services/project-list/project-list.service';

@Pipe({
  name: 'isIdenticalArray',
  pure: false
})
export class IsIdenticalArrayPipe implements PipeTransform {

  transform(array: any, arrays: any): boolean {
    for (const obj of arrays) {
      if (this.areArraysEqual(obj, array)) {
        return true;
      }
    }
    return false;
  }

  private areArraysEqual(array1: any, array2: any): boolean {
    if (array1.id !== array2.id) {
      return false;
    }
    return true;
  }

}
