/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-06-24 17:32:20                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 14:37:50                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Guards
  * Services
  * Interceptors
  * Get all assignments
*/

/* Imports */
import {
  Controller,
  UseGuards,
  Get,
  Put,
  Body,
  Param,
  UseInterceptors,
  SetMetadata
} from "@nestjs/common";
import { Assignment } from "@prisma/client";
/***/

/* Dto */
import * as assignmentsDto from "./assignments.dto";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
import { IsPermissionsGuard } from "src/guards/is-perms.guard";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
import { SocketService } from "src/services/socket/socket.service";
/***/

/* Interceptors */
import { ActivitiesInterceptor } from "../activities/activities.interceptor";
/***/

@Controller("api")
@UseGuards(IsConnectedGuard)
export class AssignmentsController {
  private parents = {
    projects: "projectId",
    tasks: "taskId",
    tickets: "ticketId"
  };

  constructor(private prisma: PrismaService,
              private socket: SocketService) {
  }

  /**
  * Get all assignments
  * @return - Assignments list 
  */
  @Get("assignments")
  async getAll(): Promise<Assignment[]> {
    try {
      return await this.prisma.assignment.findMany();
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Update assignments for projects
  * @param parent - Parent to update
  * @param id - Parent's id to update
  * @param users - Actual assignment in parent 
  * @return - New assignments in parent
  */
  @Put(":parent/:id/assignments")
  @UseInterceptors(ActivitiesInterceptor)
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "pttAll", actions: [{type: "update", actions: ["assignee"]}]}])
  async updateAssignments(
    @Param("parent") parent: string,
    @Param("id") id: string,
    @Body() body: assignmentsDto.UpdateInput
  ): Promise<Assignment[]> {
    try {
      let toFound = {};
      toFound[this.parents[parent]] = id;

      let oldAssign = await this.prisma.assignment.findMany({where: toFound});
      oldAssign.forEach((el) => {
        this.socket.broadcast("assignments", {id: el.id}, true);
      }); 
      
      await this.prisma.assignment.deleteMany({where: toFound});
      let assignments = [];

      for(let i = 0; i < body.users.length; i++) {
        let toSave = {userId: body.users[i].id};
        toSave[this.parents[parent]] = id;

        let ret = await this.prisma.assignment.create({
          data: toSave
        });

        this.socket.broadcast("assignments", ret);
        assignments.push(ret);
      }

      return assignments;
    } catch (err) {
      throw err;
    }
  }
  /***/
}
