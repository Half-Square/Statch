/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-30 11:58:09                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-20 16:02:46                              *
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
    SectionsModule
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
