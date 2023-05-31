/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-31 12:56:22                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-05-31 15:01:03                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Init socket for data recovery
  * Handle socket events
  * Catch data change and allow subcription
*/

/* Imports */
import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import * as _ from "lodash";
import { Socket, SocketOptions } from "socket.io-client";
/***/

/* Services */
import { SocketService } from "./socket.service";
import { RequestService } from "./request.service";
/***/

/* Interfaces */
interface IServerOptions {
  url: string,
  socketOpt: SocketOptions
}
/***/

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Injectable({
  providedIn: "root"
})
export class RecoveryService {
  private data: any = {};
  private socket: Socket | undefined;
  private options: IServerOptions | undefined;

  constructor(
    private cycleSocket: SocketService,
    private cycleReq: RequestService,
  ) {}

  /**
  * Init socket for data recovery
  * @param options - Server and socket informations and options
  */
  public init(options: IServerOptions): void {
    this.options = options;
    this.socket = this.cycleSocket.connect(this.options.url, this.options.socketOpt); // Connect socket
  }
  /***/

  /**
  * Handle socket events
  * @param observer - Data subscriber
  * @param name - Ressource name
  */
  private handleSocketEvents(observer: Subscriber<any[]>, name: string): void {
    if (this.socket) {
      this.socket.on(name, (data) => {
        let el = _.find(this.data[name], data);

        if (!el) {
          this.data[name] ? this.data[name].push(data) : this.data[name] = [data];
          observer.next(this.data[name]);
        }
      });
    }
  }
  /***/

  /**
  * Catch data change and allow subcription
  * @param name - Ressource name to observe
  * @return - Data observable
  */
  public get(name: string): Observable<any[]> {
    return new Observable((observer) => {
      if (!this.data[name]) {
        this.cycleReq.get(`${this.options?.url}/${name}`).then(() => {
          observer.next(this.data[name]);
        });
      } else {
        observer.next(this.data[name] || []);
      }

      this.handleSocketEvents(observer, name);
    });
  }
  /***/
}
