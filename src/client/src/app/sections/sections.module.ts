/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-20 16:03:27                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-12-05 10:33:04                              *
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/***/

/* Modules */
import { CoresModule } from "../cores/cores.module";
import { ComponentsModule } from "../components/components.module";
import { PipesModule } from "../pipes/pipes.module";
import { QuillModule } from "ngx-quill";
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
import { ToolBarSection } from "./tool-bar/tool-bar.section";
import { LabelsEditorSection } from "./labels-editor/labels-editor.section";
import { PttToolBarSection } from "./ptt-tool-bar/ptt-tool-bar.section";
import { PermsSection } from './perms/perms.section';
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
    ToolBarSection,
    LabelsEditorSection,
    PttToolBarSection,
    PermsSection
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoresModule,
    ComponentsModule,
    PipesModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
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
    ToolBarSection,
    LabelsEditorSection,
    PttToolBarSection,
    PermsSection
  ]
})
export class SectionsModule { }
