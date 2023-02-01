import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as projectsDto from '../../dto/projects.dto';
import * as commentsDto from '../../dto/comments.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private prisma: PrismaService) {}

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

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<projectsDto.detailsOutput> {
    try {
      const res = await this.prisma.project.findUnique({
        where: {
          id: Number(id),
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

  @Post('')
  async create(@Body() body: projectsDto.createInput): Promise<projectsDto.detailsOutput> {
    try {
      const res = await this.prisma.project.create({ data: body });
      return new projectsDto.detailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }

  @Get('/:id/comments')
  async getComments(@Param('id') id: string): Promise<commentsDto.publicOutput[]> {
    try {
      const res = await this.prisma.comment.findMany({
        where: { projectId: Number(id) },
      });
      return res.map((el) => new commentsDto.publicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }

  @Post('/:id/comments')
  async addComment( @Param('id') id: string,
                    @Body() body: commentsDto.createInput): Promise<commentsDto.detailsOutput> {
    try {
      const res = await this.prisma.comment.create({
        data: {
          content: body.content,
          projectId: Number(id),
        },
      });
      return new commentsDto.detailsOutput(res);
    } catch (err) {
      if (err.code == 'P2003')
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      else
        throw err;
    }
  }
}
