/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-05-31 15:03:46                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-09-21 12:40:37                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Routes
  * Views
*/

/* Imports */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TypeGuard } from "./services/guards/type-guard.service";
/***/

/* Views */
import { LoginView } from "./views/login/login.view";
import { NotFoundView } from "./views/not-found/not-found.view";
import { PttView } from "./views/ptt/ptt.view";
import { SignupView } from "./views/signup/signup.view";
/***/

/* Routes */
const routes: Routes = [
  { path: "login", component: LoginView },
  { path: "signup", component: SignupView },

  { path: ":type/:id", component: PttView, canActivate: [TypeGuard] },

  { path: "not-found", component: NotFoundView },
  { path: "*", redirectTo: "not-found" }
];
/***/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
