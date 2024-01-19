/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-06-01 15:46:03                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-18 12:21:45                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Views
*/

/* Imports */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
/***/

/* Modules */
import { CoresModule } from "../cores/cores.module";
import { ComponentsModule } from "../components/components.module";
import { SectionsModule } from "../sections/sections.module";
/***/

/* Views */
import { LoginView } from "./login/login.view";
import { SignupView } from "./signup/signup.view";
import { PttView } from "./ptt/ptt.view";
import { NotFoundView } from "./not-found/not-found.view";
import { PttAllView } from "./ptt-all/ptt-all.view";
import { MyTasksView } from "./my-tasks/my-tasks.view";
import { PipesModule } from "../pipes/pipes.module";
import { ProfileView } from "./profile/profile.view";
import { SettingsView } from "./settings/settings.view";
import { SmtpSettingsView } from "./settings/smtp/smtp-settings.view";
import { LabelsSettingsView } from "./settings/labels-settings/labels-settings.view";
import { UsersSettingsView } from "./settings/users-settings/users-settings.view";
import { MyActivitiesView } from "./my-activities/my-activities.view";
import { FirstLaunchView } from "./first-launch/first-launch.view";
import { DatabaseSettingsView } from "./settings/database-settings/database-settings.view";
import { RolesView } from "./settings/roles/roles.view";
/***/

@NgModule({
  declarations: [
    LoginView,
    SignupView,
    PttView,
    NotFoundView,
    PttAllView,
    MyTasksView,
    ProfileView,
    SettingsView,
    SmtpSettingsView,
    LabelsSettingsView,
    UsersSettingsView,
    MyActivitiesView,
    FirstLaunchView,
    DatabaseSettingsView,
    RolesView
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CoresModule,
    ComponentsModule,
    SectionsModule,
    PipesModule
  ],
  exports: [
    LoginView,
    SignupView,
    PttView,
    NotFoundView,
    PttAllView,
    MyTasksView,
    ProfileView,
    SettingsView,
    SmtpSettingsView,
    LabelsSettingsView,
    UsersSettingsView,
    MyActivitiesView,
    FirstLaunchView,
    DatabaseSettingsView,
    RolesView
  ]
})
export class ViewsModule {}
