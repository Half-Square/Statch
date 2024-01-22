/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-05-30 16:14:10                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-17 13:12:02                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Generic request function
  * Get request shortcut
  * Put request shortcut
  * Post request shortcut
*/

/* Imports */
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
/***/

/* Services */
import { ToastService } from "./toast.service";
import { UserService } from "./user.service";
/***/

@Injectable({
  providedIn: "root"
})
export class RequestService {
  constructor(private toast: ToastService,
              private user: UserService,
              private router: Router) {
  }

  /**
  * Generic request function
  * @param method - Request method (GET, POST, PUT, DELETE)
  * @param path - Request url
  * @param body - Request body
  * @param token - User token
  */
  private request(
    method: string,
    path: string,
    body?: unknown,
    token?: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      let headers: HeadersInit = {"Content-Type": "application/json"};
      if (token) headers["x-token"] = token;

      fetch(`${environment.serverUrl}/${path}`, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
      }).then((ret) => {
        ret.json().then((data: unknown) => {
          if (!ret.ok) throw data;
          return resolve(data);
        }).catch((err) => {
          if (err.statusCode && err.statusCode === 404) this.toast.print("Ressource not found...", "error");
          else this.toast.print(err.message || err.statusText, "error");

          if (err.statusCode === 403 || err.statusCode === 401) {
            this.user.clearUser();
            this.router.navigateByUrl("/login");
          }

          return reject(err);
        });
      }).catch((err: Error) => {
        this.toast.print("Something goes wrong, please retry later...", "error");
        return reject(err);
      });
    });
  }
  /***/

  /**
  * Get request shortcut
  * @param url - Request url
  * @param token - User token, if necessary
  */
  public get(url: string, token?: string): Promise<unknown> {
    return this.request("GET", url, null, token);
  }
  /***/

  /**
  * Put request shortcut
  * @param url - Request url
  * @param body - Payload
  * @param token - User token, if necessary
  */
  public put(url: string, body: unknown, token?: string): Promise<unknown> {
    return this.request("PUT", url, body, token);
  }
  /***/

  /**
  * Post request shortcut
  * @param url - Request url
  * @param body - Payload
  * @param token - User token, if necessary
  */
  public post(url: string, body: unknown, token?: string): Promise<unknown> {
    return this.request("POST", url, body, token);
  }
  /***/

  /**
  * Delete shortcut
  * @param url - Request url
  * @param token - User token, if necessary
  */
  public delete(url: string, token?: string): Promise<unknown> {
    return this.request("DELETE", url, null, token);
  }
  /***/
}
