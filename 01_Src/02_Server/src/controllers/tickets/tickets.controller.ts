/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:22:05                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-18 12:45:39                               *
 *****************************************************************************/

/* SUMMARY
 * Imports
 * Dto
 * Guards
 * getAll
 * getOne
 * update
 * getAllFromTask
 * create
 * delete
 */

/* Imports */
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  UseGuards,
  Delete
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import {PrismaService} from "../../prisma.service";
import * as ticketsDto from "../../dto/tickets.dto";
/***/

/* Guards */
import { ConnectedGuard } from "../../guards/connected/connected.guard";
import { Prisma } from "@prisma/client";
import { ActivityService } from "src/services/activity/activity.service";
/***/

@Controller("api")
@UseGuards(ConnectedGuard)
export class TicketsController {
  constructor(private prisma: PrismaService,
              private activityService: ActivityService) {}

  /**
   * Get all tickets
   * @returns - List of all tickets
   */
  @Get("tickets")
  async getAll(): Promise<ticketsDto.PublicOutput[]> {
    try {
      let res = await this.prisma.ticket.findMany({include: {owner: true}});
      return res.map((el) => new ticketsDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Get ticket by ID
   * @param id - Ticket's ID to get
   * @returns - Ticket's details
   */
  @Get("tickets/:id")
  
  async getOne(@Param("id") id: string): Promise<ticketsDto.DetailsOutput> {
    try {
      let res = await this.prisma.ticket.findUnique({
        where: {id: id},
        include: {
          targetVersion: true,
          task: {
            select: {
              projectId: true
            }
          },
          comments: {
            include: {author: true}, orderBy: { created: "asc"}
          },
          owner: true,
          assignments: {
            include: {user: true}
          },
          labels: {
            include: {label: true}
          },
          activitys: { orderBy: {created:  "desc" }, take: 8, include: {author: true, target: true, project: true, task: true, ticket: true} }
        }
      });
      
      if (res) return new ticketsDto.DetailsOutput(res);
      else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Update ticket
   * @param id - Ticket's ID to update
   * @param body - Data
   */
  @Put("tickets/:id")
  async update(
    @Param("id") id: string, 
    @Body() body: ticketsDto.UpdateInput,
    @Headers("x-token") token: string
  ): Promise<ticketsDto.DetailsOutput> {
    try {
      let user = jwt.verify(token, process.env.SALT);
      
      let includeQuery = {
        targetVersion: true,
        task: { select: { id: true, projectId: true } },
        comments: {
          include: {author: true}, orderBy: { created: "asc"}
        },
        owner: true,
        assignments: { include: {user: true} },
        labels: { include: {label: true} },
        activitys: { orderBy: {created:  "desc" }, take: 8, include: {author: true, target: true, project: true, task: true, ticket: true} }
      } as Prisma.TicketInclude;

      let ticket = await this.prisma.ticket.findUnique({
        where: { id: id}, include: includeQuery
      });

      let activities = this.activityService.getPttActivitiesOnEdit(user,'ticket', ticket, body)

      let res = await this.prisma.ticket.update({
        where: {id: id},
        data: {
          name: body.name,
          status: body.status,
          level: body.level,
          description: body.description,
          targetVersion: body.targetVersion ?{
            connect: { id: body.targetVersion.id }
          } : {},
          assignments: { deleteMany: {},
            create: body.assignments.map((el) => {
              return {userId: el.id};
            }) 
          },
          labels: { deleteMany: {},
            create: body.labels?.map(label => ({
              label: { connect: {
                  id: body.labels.find(t => t.id === label.id).id
              }}
            }))
          },
          activitys: {
            create: activities?.map(act =>  ({
              authorId: user.id,
              action: act.txt,
              taskId: ticket.task.id,
              projectId: ticket.task.projectId,
              labelId: act.label,
              targetId: act.target,
              type: act.type,
              value: act.value
            }))
          }
        },
        include: includeQuery
      });
      return new ticketsDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Get all tickets in task
   * @param id - Task's ID
   * @returns - All tickets in task
   */
  @Get("tasks/:id/tickets")
  async getAllFromTask(
    @Param("id") id: string,
  ): Promise<ticketsDto.PublicOutput[]> {
    try {
      let res = await this.prisma.ticket.findMany({
        where: {taskId: id},
        include: {
          task: { select: { projectId: true } },
          owner: true
        }
      });
      return res.map((el) => new ticketsDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Create new ticket
   * @param id - Task's ID
   * @param body - Data
   * @returns - Created task details
   */
  @Post("tasks/:id/tickets")
  async create(
    @Param("id") id: string,
    @Headers("x-token") token: string,
    @Body() body: ticketsDto.CreateInput,
  ): Promise<ticketsDto.DetailsOutput> {
    try {
      let user = jwt.verify(token, process.env.SALT);
      let res = await this.prisma.ticket.create({
        data: {
          name: body.name,
          description: body.description,
          taskId: id,
          ownerId: user.id,
          assignments: { create: [{ userId: user.id }] }
        },
        include: {
          task: { select: { projectId: true } },
          targetVersion: true,
          comments: {
            include: {author: true}, orderBy: { created: "asc"}
          },
          owner: true,
          assignments: { include: {user: true} },
          labels: { include: {label: true} },
          activitys: { orderBy: {created:  "desc" }, take: 8, include: {author: true, target: true, project: true, task: true, ticket: true} }
        }
      });

      await this.prisma.activity.create({ 
        data: {
          authorId: user.id,
          action: "create ticket",
          ticketId: res.id,
          taskId: id,
          projectId: res.task.projectId
        }
      })
      return new ticketsDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Delete ticket by id
  * @param id - Ticket to delete 
  */
  @Delete("tickets/:id")
  async delete(@Param("id") id: string): Promise<Object> {
    try {
      this.prisma.ticket.delete({where: {id: id}})
      .then(()=>{
        return {id: id};
      });
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
    return {id: ""};
  }
  /***/
}
