/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-20 16:03:27                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-26 10:43:16                              *
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
import { CoresModule } from "../cores/cores.module";
import { ComponentsModule } from "../components/components.module";
import { PipesModule } from "../pipes/pipes.module";
/***/

/* Sections */
import { NavigationSection } from "./navigation/navigation.section";
import { PttNavigationSection } from "./ptt-navigation/ptt-navigation.section";
import { PttHeaderSection } from "./ptt-header/ptt-header.section";
import { PttAdvancementSection } from "./ptt-advancement/ptt-advancement.section";
import { PttListSection } from "./ptt-list/ptt-list.section";
import { PttCommentSection } from "./ptt-comment/ptt-comment.section";
import { PttDetailsSection } from "./ptt-details/ptt-details.section";
import { ToolsNavSection } from "./tools-nav/tools-nav.section";
import { ProjectsListSection } from "./projects-list/projects-list.section";
import { ToolBarSection } from "./tool-bar/tool-bar.section";
import { LabelsEditorSection } from "./labels-editor/labels-editor.section";
/***/

@NgModule({
  declarations: [
    NavigationSection,
    PttNavigationSection,
    PttHeaderSection,
    PttAdvancementSection,
    PttListSection,
    PttCommentSection,
    PttDetailsSection,
    ToolsNavSection,
    ProjectsListSection,
    ToolBarSection,
    LabelsEditorSection
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoresModule,
    ComponentsModule,
    PipesModule
  ],
  exports: [
    NavigationSection,
    PttNavigationSection,
    PttHeaderSection,
    PttAdvancementSection,
    PttListSection,
    PttCommentSection,
    PttDetailsSection,
    ToolsNavSection,
    ProjectsListSection,
    ToolBarSection,
    LabelsEditorSection
  ]
})
export class SectionsModule { }
