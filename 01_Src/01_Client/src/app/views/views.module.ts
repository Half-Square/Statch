/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-03-17 11:51:44                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-05-11 15:36:00                              *
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
import { SmtpSettingComponent } from './setting/smtp-setting/smtp-setting.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    TasksComponent,
    TicketComponent,
    AssignComponent,
    ActivityComponent,
    SettingComponent,
    LabelsSettingComponent,
    AdminSettingComponent,
    SmtpSettingComponent
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
