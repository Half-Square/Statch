import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    HttpStatus,
    HttpException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as tasksDto from '../../dto/tasks.dto';

@Controller('')
export class TasksController {
    constructor(private prisma: PrismaService) {
    }
    
    @Get('projects/:id/tasks')
    async getAllFromProject(@Param('id') id: string): Promise<tasksDto.publicOutput[]> {
        try {
            let res = await this.prisma.task.findMany({where: {projectId: Number(id)}});
            return res.map((el) => new tasksDto.publicOutput(el));
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }

    @Get('projects/:id/tasks/:taskId')
    async getOneFromProject(@Param() params: any): Promise<tasksDto.detailsOutput> {
        try {
            let res = await this.prisma.task.findFirst({
                where: {
                    AND: [
                        { id: Number(params.taskId) },
                        { projectId: Number(params.id) },
                    ],
                }
            });
            if (res) return new tasksDto.detailsOutput(res);
            else throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }

    @Post('projects/:id/tasks')
    async create(@Param('id') id: string, @Body() body: tasksDto.createInput): Promise<tasksDto.detailsOutput> {
        try {
            let res = await this.prisma.task.create({
                data: {
                    name: body.name,
                    projectId: Number(id)
                }
            });
            return new tasksDto.detailsOutput(res);
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }
}