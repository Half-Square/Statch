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
import { PrismaService } from 'src/prisma.service';
import * as ticketsDto from '../../dto/tickets.dto';

@Controller('')
export class TicketsController {
    constructor(private prisma: PrismaService) {
    }
    
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

    @Get('tasks/:id/tickets')
    async getAllFromProject(@Param('id') id: string): Promise<ticketsDto.publicOutput[]> {
        try {
            let res = await this.prisma.ticket.findMany({where: {taskId: id}});
            return res.map((el) => new ticketsDto.publicOutput(el));
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }

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
}
