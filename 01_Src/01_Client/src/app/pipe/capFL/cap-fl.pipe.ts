/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-29 19:07:23                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-04-11 14:56:39                              *
 ****************************************************************************/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capFL'
})
export class CapFLPipe implements PipeTransform {

  transform(string: string): string {
    if (string)
      return string.charAt(0).toUpperCase() + string.slice(1);
    else
      return ""
  }

}
