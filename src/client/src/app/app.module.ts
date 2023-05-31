/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 11:58:09                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-31 15:03:26                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Modules
  * Components
*/

/* Imports */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
/***/

/* Modules */
import { DataModule } from "./modules/data/data.module";
/***/

/* Components */
import { AppComponent } from "./app.component";
/***/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
