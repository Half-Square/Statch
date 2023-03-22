/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 11:51:44                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-21 15:13:13                              *
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



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    DirectivesModule,
    ComponentsModule,
    CompositionsModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    TicketComponent
  ],
})
export class ViewsModule { }
