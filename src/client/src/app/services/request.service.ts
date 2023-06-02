/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-30 16:14:10                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-06-02 15:19:36                              *
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
import { environment } from "src/environment/environment";
/***/

@Injectable({
  providedIn: "root"
})
export class RequestService {
  /**
  * Generic request function
  * @param method - Request method (GET, POST, PUT, DELETE)
  * @param url - Request url
  */
  private request(
    method: string,
    url: string,
    body?: unknown,
    token?: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      let headers: HeadersInit = {"Content-Type": "application/json"};
      if (token) headers["x-token"] = token;

      fetch(`${environment.serverUrl}/${url}`, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
      }).then((ret) => {
        ret.json().then((data: unknown) => {
          return resolve(data);
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
