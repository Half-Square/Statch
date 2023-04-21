/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-17 11:52:49                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-04-21 12:01:24                              *
 ****************************************************************************/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';

import { ProjectsComponent } from './views/projects/projects.component';
import { AssignComponent } from './views/assign/assign.component';
import { ActivityComponent } from './views/activity/activity.component';

import { ProjectComponent } from './views/project/project.component';
import { TaskComponent } from './views/task/task.component';
import { TicketComponent } from './views/ticket/ticket.component';

import { SettingComponent } from './views/setting/setting.component';
  import { LabelsSettingComponent } from './views/setting/labels-setting/labels-setting.component';
  import { AdminSettingComponent } from './views/setting/admin-setting/admin-setting.component';

import { AuthGuardService as AuthGuard } from './guards/auth/auth-guard.service';
import { IsAdminGuard } from './guards/is-admin/is-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]  },
  { path: 'assign', component: AssignComponent, canActivate: [AuthGuard] },
  { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard] },

  { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard]  },
  { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuard]  },
  { path: 'ticket/:id', component: TicketComponent, canActivate: [AuthGuard]  },

  { path: 'settings', component: SettingComponent, canActivate: [AuthGuard],
    children: [
      { path: 'labels', component: LabelsSettingComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: AdminSettingComponent, canActivate: [IsAdminGuard]  }
    ]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
