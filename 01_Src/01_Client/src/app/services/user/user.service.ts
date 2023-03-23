/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 15:22:52                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-20 18:25:46                              *
 ****************************************************************************/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface UserInterface {
  "id":    string;
  "name":  string;
  "email": string;
  "token": string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  private static is_connected: boolean = false;

  private static user: UserInterface;

  /**
  * @name init
  * @descr init user from sessionStorage
  *
  * @param ticketId (string): id of the actual ticket
  */
  public static init() {
    let user = sessionStorage.getItem('user');
    if (user)
      this.setUser(JSON.parse(user));
  }

  public static isConnected(): boolean {
    return this.is_connected;
  }

  public static setUser(data: UserInterface) {
    if (data.name && data.token) {
      this.is_connected = true;
      this.user = data;
      sessionStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  public static getUser(): UserInterface {
    return this.user;
  }

  public static disconnect(router: Router): void {
    this.setUser({} as UserInterface)
    this.is_connected = false;
    router.navigate(['/login'])
  }
}
