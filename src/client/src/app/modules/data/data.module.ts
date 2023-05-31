/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 16:07:35                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-31 15:04:41                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { NgModule } from "@angular/core";
/***/

/* Services */
import { RequestService } from "./services/request.service";
import { SocketService } from "./services/socket.service";
import { RecoveryService } from "./services/recovery.service";
/***/

@NgModule({
  providers: [
    RequestService,
    SocketService,
    RecoveryService
  ]
})
export class DataModule {}
