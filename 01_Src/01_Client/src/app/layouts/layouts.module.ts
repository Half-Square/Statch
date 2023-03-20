/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 14:06:24                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 14:06:26                               *
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent
  ]
})
export class LayoutsModule { }
