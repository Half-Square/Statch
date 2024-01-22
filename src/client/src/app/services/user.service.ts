/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-06-02 14:59:51                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-15 17:01:44                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interface
  * Check if user is connected
  * Get logged user
  * Set logged user
  * Clear user
  * Check if user is admin
*/

/* Imports */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
/***/

/* Services */
import { SocketService } from "./socket.service";
/***/

/* Interfaces */
export interface ILoggedUser {
  id: string,
  name: string,
  email: string,
  token: string,
  isAdmin: boolean,
  picture: string,
  role: string[]
}
/***/

@Injectable({
  providedIn: "root"
})
export class UserService {
  private user: ILoggedUser | null = null;

  constructor(private router: Router,
              private socket: SocketService) {
  }

  /**
  * Check if user is connected
  * @return - Boolean, true if user is connected
  */
  public isConnected(): boolean {
    return this.user && this.user.token ? true : false;
  }
  /***/

  /**
  * Get logged user
  * @return - Logged user
  */
  public getUser(): ILoggedUser | null {
    const session = sessionStorage.getItem("user");
    if (session) this.user = JSON.parse(session);

    const ret = this.isConnected() ? {...this.user as ILoggedUser} : null;
    return ret;
  }
  /***/

  /**
  * Set logged user
  * @param data - User's data
  */
  public setUser(data: ILoggedUser): void {
    this.user = data;
    sessionStorage.setItem("user", JSON.stringify(data));
  }
  /***/

  /**
  * Clear user
  */
  public clearUser(): void {
    this.user = null;
    sessionStorage.removeItem("user");
  }
  /***/

  /**
  * Logout
  */
  public logout(): void {
    this.clearUser();
    this.socket.disconnect();
    this.router.navigate(["/login"]);
  }
  /***/

  /**
  * Check if user is admin
  * @return - Boolean, admin or not
  */
  public isAdmin(): boolean {
    return this.user?.isAdmin || false;
  }
  /***/
}
