/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-29 16:57:58                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-15 15:35:59                               *
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDifferencePipe } from './date-difference/date-difference.pipe';
import { CapFLPipe } from './capFL/cap-fl.pipe';
import { FilterPipe } from './filter/filter.pipe';
import { IsIdenticalArrayPipe } from './isIdenticalArray/is-identical-array.pipe';



@NgModule({
  declarations: [
    DateDifferencePipe,
    CapFLPipe,
    FilterPipe,
    IsIdenticalArrayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateDifferencePipe,
    CapFLPipe,
    FilterPipe,
    IsIdenticalArrayPipe
  ]
})
export class PipeModule { }
