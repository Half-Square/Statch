/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-16 10:35:39                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-19 16:30:02                               *
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
    this.init();
  }

  /**
  * Initialize web socket server 
  */
  init(): void {
    this.io = new Server(Number(process.env.SOCKET_SERVER), {
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
  broadcast(name: string, data: unknown): void {
    this.io.emit(name, data);
  }
  /***/
  
}
