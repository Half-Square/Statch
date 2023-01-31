import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as projectsDto from '../../dto/projects.dto';
import * as commentsDto from '../../dto/comments.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private prisma: PrismaService) {
    }

    @Get('')
    async getAll(): Promise<projectsDto.publicOutput[]> {
      const res = await this.prisma.project.findMany();
      return res.map((el) => new projectsDto.publicOutput(el));
    }
  
    @Get('/:id') // to do: 404 not found
    async getOne(@Param('id') id: string): Promise<projectsDto.detailsOutput> {
        const res = await this.prisma.project.findUnique({
          where: {
            id: Number(id)
          }, 
          include: {
            comments: true
          }
        });
        if (res) return new projectsDto.detailsOutput(res);
        else throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

    @Post('')
    async create(@Body() body: projectsDto.createInput): Promise<projectsDto.detailsOutput> {
      const res = await this.prisma.project.create({data: body});
      return new projectsDto.detailsOutput(res);
    }

    @Get('/:id/comments')
    async getComments(@Param('id') id: string): Promise<commentsDto.publicOutput[]> {
      const res = await this.prisma.comment.findMany({where: {parentId: Number(id)}});
      return res.map((el) => new commentsDto.publicOutput(el));
    }

    @Post('/:id/comments')
    async addComment( @Param("id") id: string,
                      @Body() body: commentsDto.createInput): Promise<any> {
      const res = await this.prisma.comment.create({
        data: {
          content: body.content,
          parentId: Number(id)
        },
      });
      return res;
    }
}
