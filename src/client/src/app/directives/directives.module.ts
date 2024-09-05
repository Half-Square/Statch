/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2024-09-05 11:42:40                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-09-05 11:43:03                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Directives
*/

/* Imports */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
/***/

/* Directives */
import { ElOnTopDirective } from "./el-on-top.directive";
/***/

@NgModule({
  declarations: [
    ElOnTopDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ElOnTopDirective
  ]
})
export class DirectivesModule { }
