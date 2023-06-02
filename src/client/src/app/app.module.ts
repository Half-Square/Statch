/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 11:58:09                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-02 15:25:53                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Modules
  * Components
  * Services
*/

/* Imports */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
/***/

/* Components */
import { AppComponent } from "./app.component";
import { ViewsModule } from "./views/views.module";
/***/

/* Services */
import { UserService } from "./services/user.service";
import { RequestService } from "./services/request.service";
import { RecoveryService } from "./services/recovery.service";
import { SocketService } from "./services/socket.service";
/***/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
    FormsModule
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
