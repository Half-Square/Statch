/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-29 19:07:23                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-03-29 19:07:23                               *
 *****************************************************************************/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capFL'
})
export class CapFLPipe implements PipeTransform {

  transform(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
