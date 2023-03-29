/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-24 15:23:08                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-28 16:16:02                              *
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

import { VersionsSectionComponent } from './versions-section/versions-section.component';
import { StatusLabeledComponent } from './status-labeled/status-labeled.component';

import { DropdownComponent } from './dropdown/dropdown.component';
import { LevelSectionComponent } from './level-section/level-section.component';
import { AssigneeSectionComponent } from './assignee-section/assignee-section.component';



@NgModule({
  declarations: [
    CommentComponent,
    CommentsSectionComponent,
    HeaderComponent,
    NavComponent,
    SearchBarComponent,
    VersionsSectionComponent,
    StatusLabeledComponent,
    DropdownComponent,
    LevelSectionComponent,
    AssigneeSectionComponent
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
    VersionsSectionComponent,
    StatusLabeledComponent,
    DropdownComponent,
    LevelSectionComponent,
    AssigneeSectionComponent
  ],
})
export class CompositionsModule { }
