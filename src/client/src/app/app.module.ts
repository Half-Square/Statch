/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-05-30 11:58:09                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-09-25 15:34:49                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Modules
*/

/* Imports */
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
/***/

/* Services */
import { UserService } from "./services/user.service";
import { RequestService } from "./services/request.service";
import { RecoveryService } from "./services/recovery.service";
import { SocketService } from "./services/socket.service";
/***/

/* Modules */
import { ViewsModule } from "./views/views.module";
import { SectionsModule } from "./sections/sections.module";
import { CoresModule } from "./cores/cores.module";
import { ComponentsModule } from "./components/components.module";
/***/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ViewsModule,
    CoresModule,
    SectionsModule,
    ComponentsModule
  ],
  providers: [
    UserService,
    RequestService,
    RecoveryService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
