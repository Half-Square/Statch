/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 14:21:47                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-27 14:35:53                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * getAll
  * getById
  * update
  * getAllFromProject
  * create
  * delete
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
  HttpException,
  UseGuards,
  Delete
} from "@nestjs/common";
import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

/* Dto */
import {PrismaService} from "../../prisma.service";
import * as tasksDto from "../../dto/tasks.dto";
/***/

@Controller("")
@UseGuards(ConnectedGuard)
export class TasksController {
  constructor(private prisma: PrismaService) {}

  /**
  * Get all tasks in database
  * @returns List of all tasks
  */
  @Get("tasks")
  async getAll(): Promise<tasksDto.PublicOutput[]> {
    try {
      let res = await this.prisma.task.findMany();
      return res.map((el) => new tasksDto.PublicOutput(el));
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
  @Get("tasks/:id")
  async getById(@Param("id") id: string): Promise<tasksDto.DetailsOutput> {
    try {
      let res = await this.prisma.task.findUnique({
        where: {id: id},
        include: {tickets: true, comments: true}
      });
      if (res) return new tasksDto.DetailsOutput(res);
      else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
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
  @Put("tasks/:id")
  async update(
    @Param("id") id: string,
    @Body() body: tasksDto.UpdateInput,
  ): Promise<tasksDto.DetailsOutput> {
    try {
      let res = await this.prisma.task.update({
        where: {id: id},
        data: body,
        include: {tickets: true, comments: true}
      });
      return new tasksDto.DetailsOutput(res);
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
  @Get("projects/:id/tasks")
  async getAllFromProject(
    @Param("id") id: string,
  ): Promise<tasksDto.PublicOutput[]> {
    try {
      let res = await this.prisma.task.findMany({where: {projectId: id}});
      return res.map((el) => new tasksDto.PublicOutput(el));
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
  @Post("projects/:id/tasks")
  async create(
    @Param("id") id: string,
    @Body() body: tasksDto.CreateInput,
  ): Promise<tasksDto.DetailsOutput> {
    try {
      let res = await this.prisma.task.create({
        data: {
          name: body.name,
          description: body.description,
          projectId: id
        },
        include: {
          comments: true,
          tickets: true
        }
      });
      return new tasksDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Delete task by id 
  */
  @Delete("tasks/:id")
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.prisma.task.delete({where: {id: id}}).catch(() => {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      });
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}
