/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-17 11:51:44                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-04-21 12:01:40                              *
 ****************************************************************************/

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { CompositionsModule } from '../compositions/compositions.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { TicketComponent } from './ticket/ticket.component';

import { DirectivesModule } from '../directives/directives.module';
import { AssignComponent } from './assign/assign.component';

import { PipeModule } from '../pipe/pipe.module';
import { ActivityComponent } from './activity/activity.component';
import { SettingComponent } from './setting/setting.component';
import { LabelsSettingComponent } from './setting/labels-setting/labels-setting.component';
import { AdminSettingComponent } from './setting/admin-setting/admin-setting.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    TicketComponent,
    AssignComponent,
    ActivityComponent,
    SettingComponent,
    LabelsSettingComponent,
    AdminSettingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    ComponentsModule,
    CompositionsModule,
    PipeModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    TicketComponent,
    AssignComponent,
    SettingComponent
  ],
})
export class ViewsModule { }
