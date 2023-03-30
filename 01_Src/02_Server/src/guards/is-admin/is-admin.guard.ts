/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-30 09:57:02                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-30 09:57:02                               *
 *****************************************************************************/

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from "jsonwebtoken";

@Injectable()
export class IsAdminGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    try {
      if (Number(process.env.DISABLE_GUARDS)) return true;

      let token: string = context.switchToHttp().getRequest().headers["x-token"];
      let user = jwt.verify(token, process.env.SALT);
      return user.isAdmin;
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      return false;
    }
  }
}
