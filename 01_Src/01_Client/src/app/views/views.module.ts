/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 11:51:44                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-30 10:57:08                              *
 ****************************************************************************/

import { NgModule } from '@angular/core';
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
import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

import { PipeModule } from '../pipe/pipe.module';
import { ActivityComponent } from './activity/activity.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    TicketComponent,
    AssignComponent,
    AdminComponent,
    AdminUsersComponent,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    ComponentsModule,
    CompositionsModule,
    PipeModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    TicketComponent,
    AssignComponent
  ],
})
export class ViewsModule { }
