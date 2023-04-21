/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-29 15:51:17                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-18 15:27:08                               *
 *****************************************************************************/

/* Imports */
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Put,
  UseGuards,
  Delete
} from "@nestjs/common";

/* Dto */
import * as projectsDto from "../../dto/projects.dto";
import * as tasksDto from "../../dto/tasks.dto";
import * as ticketsDto from "../../dto/tickets.dto";
import * as activitysDto from "../../dto/activitys.dto";


import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

/* Services */
import { PrismaService } from "../../prisma.service";
/***/

@Controller('api')
export class AssignmentsController {
  constructor(private prisma: PrismaService) { 
  }
  
    /**
    * Get one user
    * @returns - User's details
    */
    @Get("users/:id/project")
    @UseGuards(ConnectedGuard)
    async getMyProject(@Param("id") id: string): Promise<projectsDto.PublicOutput[]> {
      try {
        const res = await this.prisma.user.findUnique({
          where: {id: id },
          include: {
            assignment: {
              include: { 
                project: true,
                task: true,
                ticket: { include: { task: { select: { projectId: true } } } }
              } 
            }
          }
        });
        let toSearch = [], ticketProject = [], taskProject = [], tabProject = [];
        res.assignment.map((el) => {
          if (el.ticket) 
            ticketProject.push(el.ticket.task.projectId)
          if (el.task) 
            taskProject.push(el.task.projectId)
          if (el.project)
            tabProject.push(el.project.id)
        });
        toSearch = ticketProject.concat(taskProject.filter((item) => ticketProject.indexOf(item) < 0))
        toSearch = toSearch.concat(tabProject.filter((item) => toSearch.indexOf(item) < 0))
        const projects = await this.prisma.project.findMany({
          where: {id: { in: toSearch } }
        });
        return projects.map((el) => new projectsDto.PublicOutput(el));
      } catch (err) {
        console.error(`${new Date().toISOString()} - ${err}`);
        throw err;
      }
    }
    /***/

    /**
    * Get one user
    * @returns - User's details
    */
    @Get("users/:id/task/:project_id")
    @UseGuards(ConnectedGuard)
    async getMyTask(@Param("id") id: string, @Param("project_id") projectId: string): Promise<tasksDto.PublicOutput[]> {
      try {
        const res = await this.prisma.user.findUnique({
          where: {id: id },
          include: {
            assignment: {
              include: { 
                task: true,
                ticket: { include: { task: { select: { projectId: true } } } }
              } 
            }
          }
        });
        let toSearch = [], ticketProject = [], taskProject = [];
        res.assignment.map((el) => {
          if (el.ticket && el.ticket.task.projectId == projectId) 
            ticketProject.push(el.ticket.taskId)
          if (el.task && el.task.projectId == projectId) 
            taskProject.push(el.task.id)
        });
        toSearch = ticketProject.concat(taskProject.filter((item) => ticketProject.indexOf(item) < 0))
        const tasks = await this.prisma.task.findMany({
          where: {id: { in: toSearch } }
        });
        return tasks.map((el) => new tasksDto.PublicOutput(el));
      } catch (err) {
        console.error(`${new Date().toISOString()} - ${err}`);
        throw err;
      }
    }
    /***/

    /**
    * Get one user
    * @returns - User's details
    */
    @Get("users/:id/ticket/:task_id")
    @UseGuards(ConnectedGuard)
    async getMyTicket(@Param("id") id: string, @Param("task_id") task_id: string): Promise<ticketsDto.PublicOutput[]> {
      try {
        const res = await this.prisma.user.findUnique({
          where: {id: id },
          include: {
            assignment: {
              include: { ticket: {
                include: {
                  task: {
                    select: {
                      projectId: true
                    }
                  },
                  owner: true
                }
              } } 
            }
          }
        });
        let toSend = [];
        res.assignment.map((el) => {
          if (el.ticket && el.ticket.taskId == task_id) 
            toSend.push(new ticketsDto.PublicOutput(el.ticket))
        });
        return toSend
      } catch (err) {
        console.error(`${new Date().toISOString()} - ${err}`);
        throw err;
      }
    }
    /***/

    /**
    * Get one user
    * @returns - User's details
    */
    @Get("users/:id/activity")
    @UseGuards(ConnectedGuard)
    async getAllActivity(@Param("id") id: string): Promise<activitysDto.DetailsOutput[]> {
      try {
        const res = await this.prisma.user.findUnique({
          where: {id: id },
          include: {
            assignment: {
              include: { 
                project: true,
                task: true,
                ticket: { include: { task: { select: { projectId: true } } } }
              } 
            }
          }
        });
        let ticket = [], task = [], project = [];
        res.assignment.map((el) => {
          if (el.ticket) 
            ticket.push(el.ticket.id)
          if (el.task) 
            task.push(el.task.id)
          if (el.project)
            project.push(el.project.id)
        });

        const act = await this.prisma.activity.findMany({
          where: {
            OR: [
            { projectId: { in: project }, },
            { taskId: { in: task } },
            { ticketId: { in: ticket } },
          ]},
          orderBy: {created:  "desc" }, take: 50, 
          include: {author: true, target: true, project: true, label: true, task: true, ticket: true}
        });

        return act.map((el) => new activitysDto.DetailsOutput(el));
      } catch (err) {
        console.error(`${new Date().toISOString()} - ${err}`);
        throw err;
      }
    }
    /***/
  
}
