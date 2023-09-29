/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-19 16:08:01                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-29 15:19:26                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Components
  * Pipes
*/

/* Imports */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
/***/

/* Modules */
import { PipesModule } from "../pipes/pipes.module";
import { CoresModule } from "../cores/cores.module";
/***/

/* Components */
import { SelectComponent } from "./select/select.component";
import { CardComponent } from "./card/card.component";
import { CollapseComponent } from "./collapse/collapse.component";
import { PaginatorComponent } from "./paginator/paginator.component";
import { StatusComponent } from "./status/status.component";
import { TabsComponent } from "./tabs/tabs.component";
import { TabComponent } from "./tab/tab.component";
import { TreeComponent } from "./tree/tree.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { LevelComponent } from "./level/level.component";
import { ToastComponent } from "./toast/toast.component";
import { LabelsComponent } from "./labels/labels.component";
import { ProjectsListItemComponent } from "./projects-list-item/projects-list-item.component";
import { MyTasksItemComponent } from "./my-tasks-item/my-tasks-item.component";
import { MenuOptionsComponent } from "./menu-options/menu-options.component";
import { LabelsSettingsItemsComponent } from "./labels-settings-items/labels-settings-items.component";
import { LabelsEditComponent } from "./labels-edit/labels-edit.component";
import { ColorSelectComponent } from "./color-select/color-select.component";
import { ActivityItemComponent } from "./activity-item/activity-item.component";
import { ActivityActionStateComponent } from "./activity-action-state/activity-action-state.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { ModalComponent } from "./modal/modal.component";
/***/

@NgModule({
  declarations: [
    SelectComponent,
    CardComponent,
    CollapseComponent,
    PaginatorComponent,
    StatusComponent,
    TabsComponent,
    TabComponent,
    TreeComponent,
    BreadcrumbsComponent,
    LevelComponent,
    ToastComponent,
    LabelsComponent,
    ProjectsListItemComponent,
    MyTasksItemComponent,
    MenuOptionsComponent,
    LabelsSettingsItemsComponent,
    LabelsEditComponent,
    ColorSelectComponent,
    ActivityItemComponent,
    ActivityActionStateComponent,
    SearchBarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoresModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    SelectComponent,
    CardComponent,
    CollapseComponent,
    PaginatorComponent,
    StatusComponent,
    TabsComponent,
    TabComponent,
    TreeComponent,
    BreadcrumbsComponent,
    LevelComponent,
    ToastComponent,
    LabelsComponent,
    ProjectsListItemComponent,
    MyTasksItemComponent,
    MenuOptionsComponent,
    LabelsSettingsItemsComponent,
    LabelsEditComponent,
    ColorSelectComponent,
    ActivityItemComponent,
    ActivityActionStateComponent,
    SearchBarComponent,
    ModalComponent
  ]
})

export class ComponentsModule { }
