/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-16 10:35:39                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-11-14 09:53:55                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Initialize web socket server
  * Broadcast event
*/

/* Imports */
import { Logger, Injectable } from "@nestjs/common";
import { Server } from "socket.io";
/***/

@Injectable()
export class SocketService {
  private io;

  constructor() {
    this.init(Number(process.env.SOCKET_SERVER));
  }

  /**
  * Initialize web socket server
  * @param port - Socket server port 
  */
  init(port: number): void {
    this.io = new Server(port, {
      cors: {
        credentials: false
      }
    });
    Logger.log(`Web socket start on port ${process.env.SOCKET_SERVER}`);
  }
  /***/

  /**
  * Broadcast event 
  * @param name - Event name
  * @param data - Event data
  */
  broadcast(name: string, data: unknown, deleted?: boolean): void {
    if (deleted) data["deleted"] = true;
    this.io.emit(name, data);
  }
  /***/
  
}
