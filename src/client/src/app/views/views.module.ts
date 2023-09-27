/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-06-01 15:46:03                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-09-27 16:54:43                              *
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
/***/

@NgModule({
  declarations: [
    LoginView,
    SignupView,
    PttView,
    NotFoundView,
    ProjectsView,
    MyTasksView
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
    MyTasksView
  ]
})
export class ViewsModule {}
