/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-06-24 13:47:35                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 14:40:04                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Guards
  * Interceptors
  * Get all tasks
  * Get on task by id
  * Create new task
  * Update tasks
  * Delete task
*/

/* Imports */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Headers,
  Body,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
  UseInterceptors,
  SetMetadata
} from "@nestjs/common";
import { Task } from "@prisma/client";
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import * as tasksDto from "./tasks.dto";
/***/

/* Services */
import { SocketService } from "src/services/socket/socket.service";
import { PrismaService } from "src/prisma.service";
import { PermsService } from "src/services/perms/perms.service";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
import { IsPermissionsGuard } from "src/guards/is-perms.guard";
/***/

/* Interceptors */
import { ActivitiesInterceptor } from "../activities/activities.interceptor";
/***/

@Controller("api")
@UseGuards(IsConnectedGuard)
export class TasksController {
  constructor(private socket: SocketService,
              private prisma: PrismaService,
              private perm: PermsService) {
  }

  /**
  * Get all tasks
  * @return - Tasks list
  */
  @Get("tasks")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "tasks", actions: ["view"]}])
  async getAll(): Promise<Task[]> {
    try {
      return await this.prisma.task.findMany({
        include: {
          labels: true,
          assignments: true
        }
      });
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Get on task by id
  * @param id - Task's id to get
  * @return - Task's data 
  */
  @Get("tasks/:id")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "tasks", actions: ["view"]}])
  async getById(@Param("id") id: string): Promise<Task> {
    try {
      const task = await this.prisma.task.findUnique({
        where: {id: id},
        include: {
          labels: true,
          assignments: true
        }
      });
      if (task) return task;
      else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Create new task
  * @param id - Project's ID where create task
  * @param body - Creation data
  * @returns - Task's details
  */
  @Post("projects/:id/tasks")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "tasks", actions: ["create"]}])
  @UseInterceptors(ActivitiesInterceptor)
  async create(
    @Param("id") id: string,
    @Headers("x-token") token: string,
    @Body() body: tasksDto.CreateInput,
  ): Promise<Task> {
    try {
      const user = jwt.verify(token, process.env.SALT);
      const newTask = await this.prisma.task.create({
        data: {
          ...body,
          projectId: id,
          ownerId: user.id,
          assignments: {
            create: [{
              userId: user.id
            }]
          }
        },
        include: {
          labels: true,
          assignments: true
        }
      });

      this.socket.broadcast("tasks", newTask);
      return newTask;
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Update tasks
  * @param id - Task's ID to update
  * @param body - Data to update 
  * @returns - Updated task's details
  */
  @Put("tasks/:id")
  @UseInterceptors(ActivitiesInterceptor)
  async update(
    @Param("id") id: string,
    @Body() body: tasksDto.UpdateInput,
    @Headers("x-token") token: string
  ): Promise<Task> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: jwt.verify(token, process.env.SALT).id },
        include: {
          role: true
        }
      });

      const canUpdate = await this.perm.updateData(
        body, 
        id, 
        "tasks", 
        user, 
        ["assignments", "targetVersionId", "status", "labels", "level", "title", "description"]);
      
      if(canUpdate) {
        const task = await this.prisma.task.update({
          where: {id: id},
          data: {
            ...body,
            assignments: body.assignments ? {
              deleteMany: {},
              create: body.assignments.map((el) => {
                return {userId: el.userId};
              })
            } : undefined,
            labels: body.labels ? {
              deleteMany: {},
              create: body.labels.map((el) => {
                return {labelId: el.labelId};
              })
            } : undefined
          },
          include: {
            labels: true,
            assignments: true
          }
        });
  
        this.socket.broadcast("tasks", task);
        return task;
      } else {
        throw new HttpException("You do not have the necessary permission to perform this action", HttpStatus.NOT_MODIFIED);
      }
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Delete task
  * @param id - Task's id to remove
  * @return - Success message 
  */
  @Delete("tasks/:id")
  @UseInterceptors(ActivitiesInterceptor)
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "tasks", actions: ["delete"]}])
  async deleteById(@Param("id") id: string): Promise<{message: string}> {
    try {
      await this.prisma.task.delete({where: {id: id}});
      this.socket.broadcast("tasks", {id: id}, true);

      return {message: `Task ${id} deleted`};
    } catch (err) {
      throw err;
    }
  }
  /***/
}
