/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 11:54:55                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-20 16:55:38                              *
 ****************************************************************************/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';
import { CompositionsModule } from './compositions/compositions.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    CompositionsModule,
    ViewsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
