/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-20 16:03:27                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-20 16:07:26                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Modules
  * Sections
*/

/* Imports */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
/***/

/* Modules */
import { ComponentsModule } from "../components/components.module";
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
    ComponentsModule
  ],
  exports: [
    NavigationSection,
    PttNavigationSection
  ]
})
export class SectionsModule { }
