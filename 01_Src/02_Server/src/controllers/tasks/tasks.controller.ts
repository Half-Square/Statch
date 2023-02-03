/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-02-01 09:48:24
 * @ Description: Tasks endpoints
 */

/* SUMMARY
    * Imports
    * Dto
    * Name: getAll
    * Name: getById
    * Name: update
    * Name: getAllFromProject
    * Name: create
*/

/* Imports */
import {
    Controller,
    Get,
    Put,
    Post,
    Body,
    Param,
    HttpStatus,
    HttpException
} from '@nestjs/common';
/***/

/* Dto */
import { PrismaService } from 'src/prisma.service';
import * as tasksDto from '../../dto/tasks.dto';
/***/

@Controller('')
export class TasksController {
    constructor(private prisma: PrismaService) {
    }
    
    /**
    * Get all tasks in database
    * @returns List of all tasks
    */
    @Get('tasks')
    async getAll(): Promise<tasksDto.publicOutput[]> {
        try {
            let res = await this.prisma.task.findMany();
            return res.map((el) => new tasksDto.publicOutput(el));
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }
    /***/

    /**
    * Get task by ID
    * @param id - Task's ID to get
    * @returns - Task details
    */
    @Get('tasks/:id')
    async getById(@Param('id') id: string): Promise<tasksDto.detailsOutput> {
        try {
            let res = await this.prisma.task.findUnique({
                where: {id: id},
                include: {tickets: true}
            });
            if (res) return new tasksDto.detailsOutput(res);
            else throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }
    /***/

    /**
    * Update tasks
    * @param id - Task's ID to update
    * @param body - Data to update
    * @returns - Updated task's details
    */
    @Put('tasks/:id')
    async update(@Param('id') id: string, @Body() body: tasksDto.updateInput): Promise<tasksDto.detailsOutput> {
        try {
            let res = await this.prisma.task.update({
                where: {id: id},
                data: body,
                include: {tickets: true}
            });
            return new tasksDto.detailsOutput(res);
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }
    /***/

    /**
    * Get all tasks in project
    * @param id - Project's ID
    * @returns - Tasks list in project
    */
    @Get('projects/:id/tasks')
    async getAllFromProject(@Param('id') id: string): Promise<tasksDto.publicOutput[]> {
        try {
            let res = await this.prisma.task.findMany({where: {projectId: id}});
            return res.map((el) => new tasksDto.publicOutput(el));
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }
    /***/

    /**
    * Create new task
    * @param id - Project's ID where create task
    * @param body - Creation data
    * @returns (Task) - Task's details
    */
    @Post('projects/:id/tasks')
    async create(@Param('id') id: string, @Body() body: tasksDto.createInput): Promise<tasksDto.detailsOutput> {
        try {
            let res = await this.prisma.task.create({
                data: {
                    name: body.name,
                    projectId: id
                }
            });
            return new tasksDto.detailsOutput(res);
        } catch (err) {
            console.error(`${new Date().toISOString()} - ${err}`);
            throw err;
        }
    }
    /***/
}
