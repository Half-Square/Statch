/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 11:38:53                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-18 16:38:17                               *
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { LayoutsModule } from '../layouts/layouts.module';

import { CommentComponent } from './comment/comment.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';


@NgModule({
  declarations: [
    CommentComponent,
    HeaderComponent,
    NavComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    LayoutsModule
  ],
  exports: [
    CommentComponent,
    HeaderComponent,
    NavComponent,
    SearchBarComponent
  ],
})
export class CompositionsModule { }