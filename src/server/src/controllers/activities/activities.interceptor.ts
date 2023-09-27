/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-27 09:58:46                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-27 12:01:59                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
*/

/* Imports */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as jwt from "jsonwebtoken";
/***/

/* Services */
import { ActivitiesService } from "./activities.service";
import { PrismaService } from "src/prisma.service";
/***/

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Injectable()
export class ActivitiesInterceptor implements NestInterceptor {
  constructor(private activities: ActivitiesService,
              private prisma: PrismaService) {
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler): Promise<Observable<any>> {
    try {
      const req = context.switchToHttp().getRequest();
      const controller = req.originalUrl.split("/")[2];
      const user = jwt.verify(req.headers["x-token"], process.env.SALT);
      let tmp: any;
  
      if (req.method === "DELETE" || req.method === "PUT") { // Get item before request
        tmp = await this.prisma[controller.substring(0, controller.length-1)].findUnique({where: {id: req.params["id"]}});
      }
  
      return next.handle().pipe(map((data) => {
        if (req.method === "POST") this.activities.handlePost(user, data, controller);
        if (req.method === "PUT") this.activities.handlePut(user, tmp, data, controller);
        if (req.method === "DELETE") this.activities.handleDelete(user, {id: tmp.id, name: tmp.name}, controller);
  
        return data;
      }));
    } catch (err) {
      console.log(err);
      return next.handle();
    }
  }
}
