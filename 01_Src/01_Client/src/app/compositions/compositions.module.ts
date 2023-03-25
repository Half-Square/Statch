/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-17 11:38:53                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-25 17:05:38                              *
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

import { DirectivesModule } from '../directives/directives.module';
import { DropdownComponent } from './dropdown/dropdown.component';



@NgModule({
  declarations: [
    CommentComponent,
    CommentsSectionComponent,
    HeaderComponent,
    NavComponent,
    SearchBarComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    LayoutsModule,
    DirectivesModule
  ],
  exports: [
    CommentComponent,
    CommentsSectionComponent,
    HeaderComponent,
    NavComponent,
    SearchBarComponent,
    DropdownComponent
  ],
})
export class CompositionsModule { }
