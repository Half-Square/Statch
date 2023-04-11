/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-24 15:23:15                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-11 16:15:57                               *
 *****************************************************************************/

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

import { PipeModule } from '../pipe/pipe.module';
import { BadgesComponent } from './badges/badges.component';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    AvatarComponent,
    ButtonComponent,
    CollapseComponent,
    InputComponent,
    ProgressBarComponent,
    StatusComponent,
    LevelComponent,
    BadgesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipeModule
  ],
  exports: [
    BreadcrumbsComponent,
    AvatarComponent,
    ButtonComponent,
    CollapseComponent,
    InputComponent,
    ProgressBarComponent,
    StatusComponent,
    LevelComponent,
    BadgesComponent
  ]
})
export class ComponentsModule { }
