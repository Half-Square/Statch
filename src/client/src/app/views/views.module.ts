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
import { PttView } from "./ptt/ptt.view";
import { NotFoundView } from './not-found/not-found.view';
/***/

@NgModule({
  declarations: [
    LoginView,
    SignupView,
    PttView,
    NotFoundView
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginView,
    SignupView,
    PttView,
    NotFoundView
  ]
})
export class ViewsModule {}
