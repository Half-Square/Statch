/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-30 16:14:10                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-22 18:29:11                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Generic request function
  * Get request shortcut
  * Put request shortcut
  * Post request shortcut
*/

/* Imports */
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
/***/

@Injectable({
  providedIn: "root"
})
export class RequestService {
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
          if (!(/2[0-9]{2}/g).test(String(ret.status))) throw data;
          return resolve(data);
        }).catch((err) => {
          return reject(err);
        });
      }).catch((err: Error) => {
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
    return this.request("POST", url, null, token);
  }
  /***/
}
