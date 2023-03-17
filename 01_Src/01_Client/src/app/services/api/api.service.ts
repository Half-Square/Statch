
/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-02 13:57:55                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 15:18:45                               *
 *****************************************************************************/

import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';


interface ApiError {
  message: string;
  statusCode: number;
  action?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
    private transParams(p: Array<string>): String {
        if (p.length < 1) return "";
        let ret = "/";
        for(let i = 0; i < p.length; i++) {
            ret += p[i];
            if(i < p.length - 1) ret += "/";
        }
        return ret;
    };

    private transQueries (q: Array<string>): String {
        if (q.length < 1) return "";

        let ret = "?";
        for(let i = 0; i < q.length; i++) {
            ret += q[i];
            if(i < q.length - 1) ret += "&";
        }
        return ret;
    };

    private redirect() {
        return "hello"
    }

    private handleError(error: any): ApiError {
        // Check the error status code and return a custom error object
    if (error.status === 401) {
        return { message: 'Unauthorized', statusCode: 401, action: this.redirect() };
    } else if (error.status === 404) {
        return { message: 'Not found', statusCode: 404 };
    } else {
        return { message: 'An unexpected error occurred', statusCode: 500 };
    }
    }

    public request(method: string, url: string, data: any = null, params: Array<string> = [], queries: Array<string> = []): Promise<any> {
        return new Promise((resolve, reject) => {
            let api_url = ConfigService.get("API_URL");
            let token = UserService.isConnected() ? UserService.getUser().token : "";
            fetch(api_url+"/"+url+this.transParams(params)+this.transQueries(queries), {
                method: method,
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                    'X-Token': token
                },
                body: method == "GET" ? null : JSON.stringify(data),
            }).then((res) => {
                res.json()
                .then((json) => {
                    // cas d'erreur à gérer
                    if (json.statusCode && json.statusCode > 399)
                        return reject(json)

                    return resolve(json);
                }).catch((err) => {
                    console.error(err);
                    return reject(this.handleError(err));
                })
            })
            .catch((err) => {
                console.error(err)
                return reject(this.handleError(err));
            })
        })
    }
}
