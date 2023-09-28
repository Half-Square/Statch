/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-31 15:03:46                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-28 13:51:48                              *
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
/***/

/* Views */
import { LoginView } from "./views/login/login.view";
import { NotFoundView } from "./views/not-found/not-found.view";
import { PttView } from "./views/ptt/ptt.view";
import { SignupView } from "./views/signup/signup.view";
import { ProjectsView } from "./views/projects/projects.view";
import { MyTasksView } from "./views/my-tasks/my-tasks.view";
import { ProfileView } from "./views/profile/profile.view";
/***/

/* Routes */
const routes: Routes = [
  { path: "login", component: LoginView, canActivate: [IsNotConnectedGuard] },
  { path: "signup", component: SignupView, canActivate: [IsNotConnectedGuard] },

  { path: "projects", component: ProjectsView, canActivate: [IsConnectedGuard] },
  { path: "my-tasks", component: MyTasksView, canActivate: [IsConnectedGuard] },
  { path: ":type/:id", component: PttView, canActivate: [TypeGuard, IsConnectedGuard] },

  { path: "profile", component: ProfileView, canActivate: [IsConnectedGuard] },

  { path: "not-found", component: NotFoundView },

  { path: "", pathMatch: "full", data: {title: ""}, redirectTo: "/projects" },
  { path: "**", redirectTo: "not-found" }
];
/***/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
