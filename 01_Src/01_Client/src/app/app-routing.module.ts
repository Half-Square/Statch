/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 11:52:49                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-30 10:10:22                              *
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

import { AdminComponent } from './views/admin/admin.component';
import { AdminUsersComponent } from './views/admin/admin-users/admin-users.component';


import { AuthGuardService as AuthGuard } from './guards/auth/auth-guard.service';
import { IsAdminGuard } from './guards/is-admin/is-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]  },
  { path: 'assign', component: AssignComponent, canActivate: [AuthGuard] },

  { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard]  },
  { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuard]  },
  { path: 'ticket/:id', component: TicketComponent, canActivate: [AuthGuard]  },

  { path: 'admin', component: AdminComponent, canActivate: [IsAdminGuard]  },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [IsAdminGuard]  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
