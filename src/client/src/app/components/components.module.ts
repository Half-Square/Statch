/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-09-19 16:08:01                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-19 16:08:20                              *
 ****************************************************************************/

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CoresModule } from "../cores/cores.module";
import { SearchPipe } from "../pipe/search/search.pipe";
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
import { LabelsComponent } from './labels/labels.component';

@NgModule({
  declarations: [
    SearchPipe,
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
    LabelsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoresModule
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
    LabelsComponent
  ]
})

export class ComponentsModule { }
