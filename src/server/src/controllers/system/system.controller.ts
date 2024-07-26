/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2024-07-25 20:55:31                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-07-25 21:22:08                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Guards
  * Services
  * Ping socket
*/

/* Imports */
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
/***/

/* Services */
import { SocketService } from "src/services/socket/socket.service";
/***/

@Controller("api/system")
export class SystemController {
  constructor(private socket: SocketService) {
  }

  /**
  * Ping socket
  * @param id - Socket id 
  */
  @Post("ping")
  @UseGuards(IsConnectedGuard)
  async ping(@Body("id") id: string): Promise<{message: "pong"}> {
    this.socket.sendTo(id, "pong", {message: "pong"});
    return {message: "pong"};
  }
  /***/
}
