/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 11:51:54                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-21 19:34:38                              *
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
import { StatusLabeledComponent } from './status-labeled/status-labeled.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    AvatarComponent,
    ButtonComponent,
    CollapseComponent,
    InputComponent,
    ProgressBarComponent,
    StatusComponent,
    StatusLabeledComponent
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
    StatusLabeledComponent
  ]
})
export class ComponentsModule { }
