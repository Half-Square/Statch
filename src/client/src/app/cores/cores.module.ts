/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-29 12:59:01                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-29 12:59:39                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Cores
*/

/* Imports */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
/***/

/* Cores */
import { AvatarCore } from "./avatar/avatar.core";
import { BadgeCore } from "./badge/badge.core";
import { IconCore } from "./icon/icon.core";
import { ButtonCore } from "./button/button.core";
import { CheckboxCore } from "./checkbox/checkbox.core";
import { InputCore } from "./input/input.core";
import { InputPwdCore } from "./input-pwd/input-pwd.core";
import { LinkCore } from "./link/link.core";
import { ProgressCore } from "./progress/progress.core";
import { RadioCore } from "./radio/radio.core";
import { TagCore } from "./tag/tag.core";
import { LoadingCore } from "./loading/loading.core";
/***/

@NgModule({
  declarations: [
    AvatarCore,
    BadgeCore,
    IconCore,
    ButtonCore,
    CheckboxCore,
    InputCore,
    InputPwdCore,
    LinkCore,
    ProgressCore,
    RadioCore,
    TagCore,
    LoadingCore
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AvatarCore,
    BadgeCore,
    IconCore,
    ButtonCore,
    CheckboxCore,
    InputCore,
    InputPwdCore,
    LinkCore,
    ProgressCore,
    RadioCore,
    TagCore,
    LoadingCore
  ]
})
export class CoresModule { }
