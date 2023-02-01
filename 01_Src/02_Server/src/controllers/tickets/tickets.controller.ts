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
    
    @Get('projects/:projectId/tasks/:id/tickets')
    async getAllFromProject(@Param('id') id: string): Promise<ticketsDto.publicOutput[]> {
        try {
            let res = await this.prisma.ticket.findMany({where: {taskId: id}});
            return res.map((el) => new ticketsDto.publicOutput(el));
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }

    @Get('projects/:projectId/tasks/:id/tickets/:ticketId')
    async getOneFromProject(@Param() params: any): Promise<ticketsDto.detailsOutput> {
        try {
            let res = await this.prisma.ticket.findFirst({
                where: {
                    AND: [
                        { id: params.ticketId },
                        { taskId: params.id },
                    ],
                }
            });
            if (res) return new ticketsDto.detailsOutput(res);
            else throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }

    @Put('projects/:projectId/tasks/:taskId/tickets/:id')
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

    @Post('projects/:id/tasks/:taskId/tickets')
    async create(@Param('taskId') id: string, @Body() body: ticketsDto.createInput): Promise<ticketsDto.detailsOutput> {
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
