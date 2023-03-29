/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-29 16:57:58                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-03-29 19:06:53                               *
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDifferencePipe } from './date-difference/date-difference.pipe';
import { CapFLPipe } from './capFL/cap-fl.pipe';



@NgModule({
  declarations: [
    DateDifferencePipe,
    CapFLPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateDifferencePipe,
    CapFLPipe
  ]
})
export class PipeModule { }
