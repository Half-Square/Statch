/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-02-01 16:54:31
 * @ Description: Tickets endpoint
 */

/* SUMMARY
    * Imports
    * Dto
    * Name: getAll
    * Name: getOne
    * Name: update
    * Name: getAllFromTask
    * Name: create
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
} from '@nestjs/common';
/***/

/* Dto */
import { PrismaService } from 'src/prisma.service';
import * as ticketsDto from '../../dto/tickets.dto';
/***/

@Controller('')
export class TicketsController {
    constructor(private prisma: PrismaService) {
    }
    
    /**
    * Get all tickets
    * @returns - List of all tickets
    */
    @Get('tickets')
    async getAll(): Promise<ticketsDto.publicOutput[]> {
        try {
            let res = await this.prisma.ticket.findMany();
            return res.map((el) => new ticketsDto.publicOutput(el));
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
    @Get('tickets/:id')
    async getOne(@Param() params: any): Promise<ticketsDto.detailsOutput> {
        try {
            let res = await this.prisma.ticket.findFirst({
                where: { id: params.id }
            });
            if (res) return new ticketsDto.detailsOutput(res);
            else throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
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
    @Put('tickets/:id')
    async update(@Param() params: any, @Body() body: ticketsDto.updateInput): Promise<ticketsDto.detailsOutput> {
        try {
            let res = await this.prisma.ticket.update({
                where: {id: params.id},
                data: body
            });
            return new ticketsDto.detailsOutput(res);
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
    @Get('tasks/:id/tickets')
    async getAllFromTask(@Param('id') id: string): Promise<ticketsDto.publicOutput[]> {
        try {
            let res = await this.prisma.ticket.findMany({where: {taskId: id}});
            return res.map((el) => new ticketsDto.publicOutput(el));
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
    @Post('tasks/:id/tickets')
    async create(@Param('id') id: string, @Body() body: ticketsDto.createInput): Promise<ticketsDto.detailsOutput> {
        try {
            let res = await this.prisma.ticket.create({
                data: {
                    name: body.name,
                    taskId: id
                }
            });
            return new ticketsDto.detailsOutput(res);
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }
    /***/
}
