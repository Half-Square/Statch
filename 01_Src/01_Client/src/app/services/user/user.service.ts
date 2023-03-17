/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 15:22:52                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 16:21:29                               *
 *****************************************************************************/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class UserInterface {
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

  public static init() {
    let user = sessionStorage.getItem('user');
    if (user)
      this.setUser(JSON.parse(user));
  }

  public static isConnected(): boolean {
    return true//this.is_connected;
  }

  public static setUser(data: UserInterface) {
    this.is_connected = true;
    this.user = data;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  public static getUser(): UserInterface {
    return this.user;
  }

  public static disconnect(): void {
    this.user = new UserInterface;
    this.is_connected = false;
    let router = new Router()
    router.navigate(["/login"]);
  }
}
