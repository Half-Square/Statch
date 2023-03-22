/*****************************************************************************
 * @Author                : AdrienLanco0<121338518+AdrienLanco0@users.noreply.github.com>*
 * @CreatedDate           : 2023-03-17 11:38:53                              *
 * @LastEditors           : AdrienLanco0<121338518+AdrienLanco0@users.noreply.github.com>*
 * @LastEditDate          : 2023-03-22 11:19:34                              *
 ****************************************************************************/

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
import { CommentsSectionComponent } from './comments-section/comments-section.component';


@NgModule({
  declarations: [
    CommentComponent,
    CommentsSectionComponent,
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
    CommentsSectionComponent,
    HeaderComponent,
    NavComponent,
    SearchBarComponent
  ],
})
export class CompositionsModule { }
