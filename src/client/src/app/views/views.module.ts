/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-06-01 15:46:03                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-08-20 10:35:01                              *
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
import { NgApexchartsModule } from "ng-apexcharts";
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
import { StatsView } from "./stats/stats.view";
import { VersionsView } from "./versions/versions.view";
import { SystemSettingsView } from './settings/system-settings/system-settings.view';
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
    StatsView,
    VersionsView,
    SystemSettingsView
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CoresModule,
    ComponentsModule,
    SectionsModule,
    PipesModule,
    NgApexchartsModule
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
    StatsView,
    VersionsView
  ]
})
export class ViewsModule {}
