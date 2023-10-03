/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-31 15:03:46                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-03 11:17:12                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Routes
  * Views
  * Guards
*/

/* Imports */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
/***/

/* Guards */
import { TypeGuard } from "./guards/type-guard.service";
import { IsConnectedGuard } from "./guards/is-connected.guard";
import { IsNotConnectedGuard } from "./guards/is-not-connected.guard";
import { IsAdminGuard } from "./guards/is-admin.guard";
/***/

/* Views */
import { LoginView } from "./views/login/login.view";
import { NotFoundView } from "./views/not-found/not-found.view";
import { PttView } from "./views/ptt/ptt.view";
import { SignupView } from "./views/signup/signup.view";
import { PttAllView } from "./views/ptt-all/ptt-all.view";
import { MyTasksView } from "./views/my-tasks/my-tasks.view";
import { ProfileView } from "./views/profile/profile.view";
import { SettingsView } from "./views/settings/settings.view";
import { SmtpSettingsView } from "./views/settings/smtp/smtp-settings.view";
import { LabelsSettingsView } from "./views/settings/labels-settings/labels-settings.view";
import { UsersSettingsView } from "./views/settings/users-settings/users-settings.view";
import { MyActivitiesView } from "./views/my-activities/my-activities.view";
/***/

/* Routes */
const routes: Routes = [
  { path: "login", component: LoginView, canActivate: [IsNotConnectedGuard] },
  { path: "signup", component: SignupView, canActivate: [IsNotConnectedGuard] },

  { path: "profile", component: ProfileView, canActivate: [IsConnectedGuard] },
  { path: "settings", component: SettingsView, canActivate: [IsConnectedGuard],
    children: [
      { path: "labels", component: LabelsSettingsView, canActivate: [IsConnectedGuard ]},
      { path: "smtp", component: SmtpSettingsView, canActivate: [IsConnectedGuard, IsAdminGuard] },
      { path: "users", component: UsersSettingsView, canActivate: [IsConnectedGuard, IsAdminGuard] },
      { path: "", pathMatch: "full", redirectTo: "/settings/labels"}
    ]
  },

  { path: "my-tasks", component: MyTasksView, canActivate: [IsConnectedGuard] },
  { path: "my-activities", component: MyActivitiesView, canActivate: [IsConnectedGuard] },
  { path: ":type", component: PttAllView, canActivate: [IsConnectedGuard, TypeGuard] },
  { path: ":type/:id", component: PttView, canActivate: [TypeGuard, IsConnectedGuard] },

  { path: "not-found", component: NotFoundView },

  { path: "", pathMatch: "full", redirectTo: "/projects" },
  { path: "**", redirectTo: "not-found" }
];
/***/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
