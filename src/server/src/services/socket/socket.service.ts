/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2023-06-16 10:35:39                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-07-25 21:25:32                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Initialize web socket server
  * Broadcast event
*/

/* Imports */
import { Logger, Injectable } from "@nestjs/common";
import { Server } from "socket.io";
import * as jwt from "jsonwebtoken";
/***/

@Injectable()
export class SocketService {
  private io;
  private sockets = [];

  constructor() {
    this.init(Number(process.env.SOCKET_SERVER));
  }

  /**
  * Initialize web socket server
  * @param port - Socket server port 
  */
  public init(port: number): void {
    this.io = new Server(port, {
      cors: {
        credentials: false
      }
    });

    this.io.on("connection", (socket) => {
      let token = socket.handshake.headers["x-token"];

      try {
        jwt.verify(token, process.env.SALT);
        this.sockets.push({socket: socket, token: token});
      } catch (err) {
        socket.emit("error", "Invalid token");
        socket.disconnect();
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
  public broadcast(name: string, data: unknown, deleted?: boolean): void {
    this.clear();
    
    if (deleted) data["deleted"] = true;
    this.io.emit(name, data);
  }
  /***/

  /**
  * Send to client
  * @param id - Client id
  * @param event - Event name
  * @param data - Data to send 
  */
  public sendTo(id: string, event: string, data: unknown): void {
    let index = this.sockets.findIndex((el) => el.socket.id == id);

    if (index != -1) {
      this.sockets[index].socket.emit(event, data);
    }
  }
  /***/
  
  /**
  * Clear timeout socket 
  */
  private clear(): void {
    this.sockets.forEach((el, i) => {
      try {
        jwt.verify(el.token, process.env.SALT);
      } catch (err) {
        el.socket.emit("error", "Token timeout");
        el.socket.disconnect();
        this.sockets.splice(i, 1);
      }
    });
  }
  /***/
}
