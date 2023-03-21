/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-20 16:48:57                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-03-20 16:48:57                               *
 *                                                                            *
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FocusOnShowDirective } from './focus-on-show/focus-on-show.directive';



@NgModule({
  declarations: [
    FocusOnShowDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FocusOnShowDirective
  ]
})
export class DirectivesModule { }
