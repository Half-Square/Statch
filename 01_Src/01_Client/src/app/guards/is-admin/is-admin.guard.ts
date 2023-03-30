/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-30 10:09:04                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-30 10:13:41                               *
 *****************************************************************************/

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { ApiService } from 'src/app/services/api/api.service';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private router: Router,
              private api: ApiService) { }

  async canActivate(): Promise<boolean> {
    if (!UserService.isConnected()) {
      this.router.navigate(['login']);
      return false;
    }

    return new Promise((resolve, rejects) => {
      this.api.request('GET', "isadmin")
      .then(() => {
        return resolve(true)
      }).catch(() => {
        this.router.navigate(['projects']);
        return rejects(false)
      })
    })
  }
}
