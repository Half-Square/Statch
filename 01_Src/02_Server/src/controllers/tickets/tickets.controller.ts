/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:22:05                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-21 14:22:14                               *
 *****************************************************************************/

/* SUMMARY
 * Imports
 * Dto
 * getAll
 * getOne
 * update
 * getAllFromTask
 * create
 */

/* Imports */
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus
} from "@nestjs/common";
/***/

/* Dto */
import {PrismaService} from "src/prisma.service";
import * as ticketsDto from "../../dto/tickets.dto";
/***/

@Controller("")
export class TicketsController {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all tickets
   * @returns - List of all tickets
   */
  @Get("tickets")
  async getAll(): Promise<ticketsDto.PublicOutput[]> {
    try {
      let res = await this.prisma.ticket.findMany();
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
  async getOne(@Param() params): Promise<ticketsDto.DetailsOutput> {
    try {
      let res = await this.prisma.ticket.findFirst({
        where: {id: params.id}
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
    @Param() params, 
    @Body() body: ticketsDto.UpdateInput
  ): Promise<ticketsDto.DetailsOutput> {
    try {
      let res = await this.prisma.ticket.update({
        where: {id: params.id},
        data: body
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
      let res = await this.prisma.ticket.findMany({where: {taskId: id}});
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
    @Body() body: ticketsDto.CreateInput,
  ): Promise<ticketsDto.DetailsOutput> {
    try {
      let res = await this.prisma.ticket.create({
        data: {
          name: body.name,
          taskId: id
        }
      });
      return new ticketsDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}
