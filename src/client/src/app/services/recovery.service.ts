/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-31 12:56:22                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-25 16:54:46                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Init socket for data recovery
  * Handle socket events
  * Catch data change and allow subcription
  * Subscribe to single ressource
  * Get collection sync
  * Get data in collection
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
import { UserService } from "./user.service";
/***/

/* Interfaces */
interface IServerOptions {
  apiUrl: string,
  socketUrl: string,
  socketOpt?: SocketOptions
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
  private socketEvt: string[] = []; // Manage socket listener

  constructor(
    private mySocket: SocketService,
    private api: RequestService,
    private user: UserService
  ) {}

  /**
  * Init socket for data recovery
  * @param options - Server and socket informations and options
  */
  public init(options: IServerOptions): void {
    this.options = options;
    this.socket = this.mySocket.connect(
      this.options.socketUrl,
      this.options.socketOpt || {}
    ); // Connect socket
  }
  /***/

  /**
  * Handle socket events
  * @param observer - Data subscriber
  * @param name - Ressource name
  */
  private handleSocketEvents(observer: Subscriber<any[]>, name: string): void {
    let evtIndex = _.findIndex(this.socketEvt, (el) => el === name);

    const send = (): void => {
      observer.next(this.data[name]);
    };

    if (this.socket && evtIndex === -1) { // Avoid listener duplication
      this.socketEvt.push(name); // Save socket listener

      this.socket.on(name, (data) => {
        let index = _.findIndex(this.data[name], {id: data.id});

        if (data["deleted"] && index != -1) {
          this.data[name].splice(index, 1);
        } else {
          if (index == -1) {
            this.data[name] ? this.data[name].push(data) : this.data[name] = [data];
          } else {
            this.data[name][index] = data;
          }
        }

        send();
      });
    }
  }
  /***/

  /**
  * Handle socket events
  * @param observer - Data subscriber
  * @param name - Ressource name
  * @param id - Ressource id
  */
  private handleSingleSocketEvents(
    observer: Subscriber<any[]>,
    name: string): void {
    if (this.socket) {
      this.socket.on(name, (data) => {
        let index = _.findIndex(this.data[name], {id: data.id});

        if (data["deletec"] && index != -1) {
          this.data[name].splice(index, 1);
        } else {
          if (index == -1) {
            this.data[name] ? this.data[name].push(data) : this.data[name] = [data];
            observer.next(data);
          } else {
            this.data[name][index] = data;
          }
        }

        observer.next(this.data[name][index]);
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
        const user = this.user.getUser();
        this.api.get(`api/${name}`, user?.token).then((data) => {
          this.data[name] = data;
          observer.next(this.data[name]);
        });
      } else {
        observer.next(this.data[name] || []);
      }

      this.handleSocketEvents(observer, name);
    });
  }
  /***/

  /**
  * Subscribe to single ressource
  * @param collection - Collection name
  * @param id - Ressource id
  * @return - Data observable
  */
  public getSingle(collection: string, id: string): Observable<any> {
    return new Observable((observer) => {
      if (!this.data[collection]) {
        const user = this.user.getUser();
        this.api.get(`api/${collection}`, user?.token).then((data) => {
          this.data[collection] = data;
          observer.next(_.find(this.data[collection], {id: id}));
        });
      } else {
        observer.next(_.find(this.data[collection], {id: id}));
      }

      this.handleSingleSocketEvents(observer, collection);

      return (() => {
        this.socket?.removeAllListeners(collection);
      });
    });
  }
  /***/

  /**
  * Get collection sync
  * @param collection - Collection name
  * @return - Raw data
  */
  public async getSync(collection: string): Promise<unknown[]> {
    if(!this.data[collection]) {
      const user = this.user.getUser();
      this.data[collection] = [];
      this.data[collection] = await this.api.get(`api/${collection}`, user?.token);
    }

    return this.data[collection];
  }
  /***/

  /**
   * Get data in collection
   * @param collection - Collection name
   * @param id - Ressource id
   * @returns - Raw data
   */
  public async getSingleSync(collection: string, id: string): Promise<unknown> {
    if(!this.data[collection]) {
      const user = this.user.getUser();
      this.data[collection] = [];
      this.data[collection] = await this.api.get(`api/${collection}`, user?.token);
    }

    return _.find(this.data[collection], {id: id}) || null;
  }
  /***/
}
