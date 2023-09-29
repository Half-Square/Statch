/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-06-01 15:46:03                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-28 15:52:27                              *
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
import { ProjectsView } from "./projects/projects.view";
import { MyTasksView } from "./my-tasks/my-tasks.view";
import { PipesModule } from "../pipes/pipes.module";
import { ProfileView } from "./profile/profile.view";
import { SettingsView } from "./settings/settings.view";
import { SmtpSettingsView } from "./settings/smtp/smtp-settings.view";
import { LabelsSettingsView } from "./settings/labels-settings/labels-settings.view";
import { UsersSettingsView } from "./settings/users-settings/users-settings.view";
import { MyActivitiesView } from "./my-activities/my-activities.view";
/***/

@NgModule({
  declarations: [
    LoginView,
    SignupView,
    PttView,
    NotFoundView,
    ProjectsView,
    MyTasksView,
    ProfileView,
    SettingsView,
    SmtpSettingsView,
    LabelsSettingsView,
    UsersSettingsView,
    MyActivitiesView
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
    ProjectsView,
    MyTasksView,
    ProfileView,
    SettingsView,
    SmtpSettingsView,
    LabelsSettingsView,
    UsersSettingsView,
    MyActivitiesView
  ]
})
export class ViewsModule {}
