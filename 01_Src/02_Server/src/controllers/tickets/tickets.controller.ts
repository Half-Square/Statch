/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:22:05                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-28 14:30:34                               *
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
/***/

@Controller("")
@UseGuards(ConnectedGuard)
export class TicketsController {
  constructor(private prisma: PrismaService) {}

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
        include: {comments: true, owner: true}
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
    @Body() body: ticketsDto.UpdateInput
  ): Promise<ticketsDto.DetailsOutput> {
    try {
      let res = await this.prisma.ticket.update({
        where: {id: id},
        data: body,
        include: {comments: true, owner: true}
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
        include: {owner: true}
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
          ownerId: user.id
        },
        include: {comments: true, owner: true}
      });
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
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.prisma.ticket.delete({where: {id: id}});
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}
