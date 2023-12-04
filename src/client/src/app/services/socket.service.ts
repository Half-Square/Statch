/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-31 12:56:22                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-12-04 18:40:06                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Connect web socket
  * Disconnect socket
  * Get socket instance
*/

/* Imports */
import { Injectable } from "@angular/core";
import { Socket, SocketOptions, io } from "socket.io-client";
/***/

/* Services */
import { ToastService } from "./toast.service";
import { UserService } from "./user.service";
/***/

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket: Socket | undefined;

  constructor(private toast: ToastService,
              private user: UserService) {
  }

  /**
  * Connect web socket
  * @param url - URL to connect
  * @param options - Socket options
  */
  public connect(url: string, options: SocketOptions): Socket {
    let token = this.user.getUser()?.token;

    if (!this.socket) {
      this.socket = io(url, {
        ...options,
        extraHeaders: {
          "x-token": token as string
        }
      });

      this.socket.on("error", (data) => {
        this.toast.print(data, "error");
        this.disconnect();
        this.user.logout();
      });
    }

    return this.socket;
  }
  /***/

  /**
  * Disconnect socket
  */
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined;
    }
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
