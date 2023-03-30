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
/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-29 15:51:17                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-30 11:20:29                               *
 *****************************************************************************/

/* Dto */
import * as projectsDto from "../../dto/projects.dto";
import * as tasksDto from "../../dto/tasks.dto";
import * as ticketsDto from "../../dto/tickets.dto";

import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

/* Services */
import { PrismaService } from "../../prisma.service";
/***/

@Controller('')
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
              include: { project: true } 
            }
          }
        });
        let toSend = [];
        console.log(res.assignment);
        
        res.assignment.map((el) => {
          if (el.project) 
            toSend.push(new projectsDto.PublicOutput(el.project))
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
    @Get("users/:id/task/:project_id")
    @UseGuards(ConnectedGuard)
    async getMyTask(@Param("id") id: string, @Param("project_id") projectId: string): Promise<tasksDto.PublicOutput[]> {
      try {
        const res = await this.prisma.user.findUnique({
          where: {id: id },
          include: {
            assignment: {
              include: { task: true } 
            }
          }
        });
        let toSend = [];
        res.assignment.map((el) => {
          if (el.task && el.task.projectId == projectId) 
            toSend.push(new tasksDto.PublicOutput(el.task))
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

  
}
