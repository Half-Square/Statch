/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-17 11:52:49                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-24 14:32:41                              *
 *                                                                           *
 ****************************************************************************/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { ProjectComponent } from './views/project/project.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { SignupComponent } from './views/signup/signup.component';
import { TaskComponent } from './views/task/task.component';
import { TicketComponent } from './views/ticket/ticket.component';
import { AssignComponent } from './views/assign/assign.component';

import {
  AuthGuardService as AuthGuard
} from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]  },
  { path: 'assign', component: AssignComponent, canActivate: [AuthGuard] },

  { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard]  },
  { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuard]  },
  { path: 'ticket/:id', component: TicketComponent, canActivate: [AuthGuard]  }

  // { path: 'new/:type', component: NewElemComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
