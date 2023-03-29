/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-24 15:23:15                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-29 16:39:48                              *
 ****************************************************************************/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AvatarComponent } from './avatar/avatar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './button/button.component';
import { CollapseComponent } from './collapse/collapse.component';
import { InputComponent } from './input/input.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { StatusComponent } from './status/status.component';
import { LevelComponent } from './level/level.component';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    AvatarComponent,
    ButtonComponent,
    CollapseComponent,
    InputComponent,
    ProgressBarComponent,
    StatusComponent,
    LevelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    BreadcrumbsComponent,
    AvatarComponent,
    ButtonComponent,
    CollapseComponent,
    InputComponent,
    ProgressBarComponent,
    StatusComponent,
    LevelComponent
  ]
})
export class ComponentsModule { }
