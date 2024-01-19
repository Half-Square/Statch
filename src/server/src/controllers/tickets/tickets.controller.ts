/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-06-24 13:45:04                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 14:40:13                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Guards
  * Interceptors
  * Get all tickets
  * Get one ticket by id
  * Create new tasks
  * Update ticket
  * Delete ticket
*/

/* Imports */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  SetMetadata
} from "@nestjs/common";
import { Ticket } from "@prisma/client";
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import * as ticketsDto from "./tickets.dto";
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
export class TicketsController {
  constructor(private socket: SocketService,
              private prisma: PrismaService,
              private perm: PermsService) {
  }

  /**
  * Get all tickets
  * @return - Tickets list 
  */
  @Get("tickets")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "tickets", actions: ["view"]}])
  async getAll(): Promise<Ticket[]> {
    try {
      return await this.prisma.ticket.findMany({
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
  * Get one ticket by id
  * @param id - Ticket's id to get
  * @return - Ticket's details 
  */
  @Get("tickets/:id")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "tickets", actions: ["view"]}])
  async getById(@Param("id") id: string): Promise<Ticket> {
    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: {id: id},
        include: {
          labels: true,
          assignments: true
        }
      });
      if (ticket) return ticket;
      else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Create new ticket
  * @param id - task's ID where create ticket
  * @param body - Creation data
  * @returns - Ticket's details
  */
  @Post("tasks/:id/tickets")
  @UseInterceptors(ActivitiesInterceptor)
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "tickets", actions: ["create"]}])
  async create(
    @Param("id") id: string,
    @Headers("x-token") token: string,
    @Body() body: ticketsDto.CreateInput,
  ): Promise<Ticket> {
    try {
      const user = jwt.verify(token, process.env.SALT);
      const newTask = await this.prisma.ticket.create({
        data: {
          ...body,
          taskId: id,
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

      this.socket.broadcast("tickets", newTask);
      return newTask;
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Update ticket
  * @param id - ticket's ID to update
  * @param body - Data to update 
  * @returns - Updated ticket's details
  */
  @Put("tickets/:id")
  @UseInterceptors(ActivitiesInterceptor)
  async update(
    @Param("id") id: string,
    @Body() body: ticketsDto.UpdateInput,
    @Headers("x-token") token: string
  ): Promise<Ticket> {
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
        "tickets", 
        user, 
        ["assignments", "targetVersionId", "status", "labels", "level", "title", "description"]);
      
      if(canUpdate) {
        const ticket = await this.prisma.ticket.update({
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
  
        this.socket.broadcast("tickets", ticket);
        return ticket;
      } else {
        throw new HttpException("You do not have the necessary permission to perform this action", HttpStatus.NOT_MODIFIED);
      }
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Delete ticket
  * @param id - Ticket's id to delete
  * @return - Success message 
  */
  @Delete("tickets/:id")
  @UseInterceptors(ActivitiesInterceptor)
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "tickets", actions: ["delete"]}])
  async deleteById(@Param("id") id: string): Promise<{message: string}> {
    try {
      await this.prisma.ticket.delete({where: {id: id}});
      this.socket.broadcast("tickets", {id: id}, true);

      return {message: `Ticket ${id} deleted`};
    } catch (err) {
      throw err;
    }
  }
  /***/
}
