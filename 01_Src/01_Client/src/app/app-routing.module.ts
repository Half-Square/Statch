/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 11:52:49                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 11:52:49                               *
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { ProjectComponent } from './views/project/project.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { SignupComponent } from './views/signup/signup.component';
import { TaskComponent } from './views/task/task.component';
import { TicketComponent } from './views/ticket/ticket.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'projects', component: ProjectsComponent },

  { path: 'project/:id', component: ProjectComponent },
  { path: 'task/:id', component: TaskComponent },
  { path: 'ticket/:id', component: TicketComponent }

  // { path: 'new/:type', component: NewElemComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
