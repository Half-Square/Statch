/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-21 15:04:15                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-21 15:04:30                               *
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableTextDirective } from './editable-text/editable-text.directive';



@NgModule({
  declarations: [
    EditableTextDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EditableTextDirective
  ]
})
export class DirectivesModule { }
