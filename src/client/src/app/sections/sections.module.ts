/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-20 16:03:27                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-21 14:02:54                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Modules
  * Sections
*/

/* Imports */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
/***/

/* Modules */
import { ComponentsModule } from "../components/components.module";
import { CoresModule } from "../cores/cores.module";
/***/

/* Sections */
import { NavigationSection } from "./navigation/navigation.section";
import { PttNavigationSection } from "./ptt-navigation/ptt-navigation.section";
/***/

@NgModule({
  declarations: [
    NavigationSection,
    PttNavigationSection
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    CoresModule
  ],
  exports: [
    NavigationSection,
    PttNavigationSection
  ]
})
export class SectionsModule { }
