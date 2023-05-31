/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-31 12:56:22                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-05-31 14:57:20                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Connect web socket
  * Disconnect socket
  * Get socket instance
*/

/* Imports */
import { Injectable } from "@angular/core";
import { Socket, SocketOptions, io } from "socket.io-client";
/***/

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket: Socket | undefined;

  /**
  * Connect web socket
  * @param url - URL to connect
  * @param options - Socket options
  */
  public connect(url: string, options: SocketOptions): Socket {
    if (!this.socket) this.socket = io(url, options);
    return this.socket;
  }
  /***/

  /**
  * Disconnect socket
  */
  public disconnect(): void {
    if (this.socket) this.socket.disconnect();
  }
  /***/

  /**
  * Get socket instance
  */
  public getSocket(): Socket {
    return this.socket as Socket;
  }
  /***/
}
