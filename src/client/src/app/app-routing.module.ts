/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-31 15:03:46                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-22 18:25:40                              *
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

/* Views */
import { LoginView } from "./views/login/login.view";
import { NotFoundView } from "./views/not-found/not-found.view";
import { PttView } from "./views/ptt/ptt.view";
import { SignupView } from "./views/signup/signup.view";
/***/

/* Guards */
import { TypeGuard } from "./services/guards/type-guard.service";
import { IsConnectedGuard } from "./guards/is-connected.guard";
import { IsNotConnectedGuard } from "./guards/is-not-connected.guard";
/***/

/* Routes */
const routes: Routes = [
  { path: "login", component: LoginView, canActivate: [IsNotConnectedGuard] },
  { path: "signup", component: SignupView, canActivate: [IsNotConnectedGuard] },

  { path: ":type/:id", component: PttView, canActivate: [TypeGuard, IsConnectedGuard] },

  { path: "not-found", component: NotFoundView },

  { path: "", pathMatch: "full", data: {title: ""}, redirectTo: "/home" },
  { path: "*", redirectTo: "not-found" }
];
/***/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
