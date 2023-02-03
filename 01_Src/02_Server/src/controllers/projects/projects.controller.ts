/**
 * @ Author: Jbristhuille
 * @ Create Time: 2023-01-31 09:16:17
 * @ Description: Projects endpoint
 */

/* SUMMARY
  * Imports
  * Dto
  * Name: getAll
  * Name: getOne
  * Name: update
  * Name: create
*/

/* Imports */
import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
/***/

/* Dto */
import { PrismaService } from 'src/prisma.service';
import * as projectsDto from '../../dto/projects.dto';
/***/

@Controller('projects')
export class ProjectsController {
  constructor(private prisma: PrismaService) {}

  /**
  * Get all projects
  * @returns - List of all projects
  */
  @Get('')
  async getAll(): Promise<projectsDto.publicOutput[]> {
    try {
      const res = await this.prisma.project.findMany();
      return res.map((el) => new projectsDto.publicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Get one project by ID
  * @param id - Project's ID to get
  * @returns - Project details
  */
  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<projectsDto.detailsOutput> {
    try {
      const res = await this.prisma.project.findUnique({
        where: {
          id: id,
        },
        include: {
          comments: true,
          tasks: true
        },
      });
      if (res) return new projectsDto.detailsOutput(res);
      else throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Update project
  * @param id - Project's ID to update
  * @param body - Data to update
  * @returns - Updated project
  */
  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: projectsDto.updateInput): Promise<projectsDto.detailsOutput> {
    try {
      let res = await this.prisma.project.update({
        where: {
          id: id
        },
        data: body,
        include: {
          tasks: true,
          comments: true
        }
      });
      return new projectsDto.detailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Create project
  * @param body - Data to update
  * @returns {Project} - Updated project
  */
  @Post('')
  async create(@Body() body: projectsDto.createInput): Promise<projectsDto.detailsOutput> {
    try {
      const res = await this.prisma.project.create({
        data: body,
        include: {
          comments: true,
          tasks: true
        }
      });
      return new projectsDto.detailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}
