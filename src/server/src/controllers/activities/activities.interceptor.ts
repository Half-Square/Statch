/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2023-09-27 09:58:46                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-08-27 10:54:01                               *
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
  
      return next.handle().pipe(map(async(data) => {
        if (req.method === "POST") { // Handle child creation
          let parentId = data.projectId || data.taskId; // Get parent id
          await this.activities.handlePost(
            user,
            data,
            controller == "projects" ? "tasks" : "tickets", // Define target type
            parentId || undefined); // Print to parent if possible
        }
        if (req.method === "PUT" && tmp != null) await this.activities.handlePut(user, tmp, data, controller); // Handle update
        if ((req.method === "POST" || req.method === "DELETE") && tmp) { // Handle child deletion
          let parentId = tmp.projectId || tmp.taskId; // Get parent id
          await this.activities.handleDelete(
            user,
            {id: tmp.id, name: tmp.name},
            controller,
            parentId || undefined // Print to parent if possible
          );
        }
        return data;
      }));
    } catch (err) {
      console.error(err);
      return next.handle();
    }
  }
}
