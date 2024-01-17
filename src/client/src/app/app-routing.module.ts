/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-05-31 15:03:46                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-17 14:45:49                              *
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
import { RulesGuard } from "./guards/rules.guard";
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
import { FirstLaunchView } from "./views/first-launch/first-launch.view";
import { DatabaseSettingsView } from "./views/settings/database-settings/database-settings.view";
/***/

/* Routes */
const routes: Routes = [
  { path: "login", component: LoginView, canActivate: [IsNotConnectedGuard] },
  { path: "signup", component: SignupView, canActivate: [IsNotConnectedGuard] },
  { path: "first-launch", component: FirstLaunchView },

  { path: "profile", component: ProfileView, canActivate: [IsConnectedGuard] },
  { path: "settings", component: SettingsView, canActivate: [IsConnectedGuard],
    children: [
      { path: "labels", component: LabelsSettingsView, canActivate: [IsConnectedGuard, RulesGuard],
        data: {
          requiredPermissions: [
            { type: "labels", actions: ["view"] }
          ]
        }
      },
      { path: "smtp", component: SmtpSettingsView, canActivate: [IsConnectedGuard, RulesGuard],
        data: {
          requiredPermissions: [
            { type: "smtp", actions: ["view"] }
          ]
        }
      },
      { path: "users", component: UsersSettingsView, canActivate: [IsConnectedGuard, IsAdminGuard, RulesGuard],
        data: {
          requiredPermissions: [
            { type: "users", actions: ["view"] }
          ]
        }
      },
      { path: "database", component: DatabaseSettingsView, canActivate: [IsConnectedGuard, IsAdminGuard, RulesGuard],
        data: {
          requiredPermissions: [
            { type: "database", actions: ["view"] }
          ]
        }
      },
      { path: "", pathMatch: "full", redirectTo: "/settings/labels"}
    ]
  },

  { path: "not-found", component: NotFoundView },

  { path: "my-tasks", component: MyTasksView, canActivate: [IsConnectedGuard] },
  { path: "my-activities", component: MyActivitiesView, canActivate: [IsConnectedGuard] },
  { path: ":type", component: PttAllView, canActivate: [IsConnectedGuard, TypeGuard, RulesGuard],
    data: {
      requiredPermissions: [
        { type: "pttType", actions: ["view"] }
      ]
    }
  },
  { path: ":type/:id", component: PttView, canActivate: [TypeGuard, IsConnectedGuard, RulesGuard],
    data: {
      requiredPermissions: [
        { type: "pttType", actions: ["view"] }
      ]
    }
  },


  { path: "", pathMatch: "full", redirectTo: "/projects" },
  { path: "**", redirectTo: "not-found" }
];
/***/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
