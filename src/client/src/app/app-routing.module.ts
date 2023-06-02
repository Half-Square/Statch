/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-31 15:03:46                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-02 15:16:16                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Routes
  * Views
*/

/* Imports */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
/***/

/* Views */
import { LoginView } from "./views/login/login.view";
import { SignupView } from "./views/signup/signup.view";
/***/

/* Routes */
const routes: Routes = [
  { path: "login", component: LoginView },
  { path: "signup", component: SignupView }
];
/***/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
