/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-01 15:46:03                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-02 15:18:16                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Views
*/

/* Imports */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
/***/

/* Views */
import { LoginView } from "./login/login.view";
import { SignupView } from "./signup/signup.view";
/***/

@NgModule({
  declarations: [
    LoginView,
    SignupView
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginView,
    SignupView
  ]
})
export class ViewsModule {}
