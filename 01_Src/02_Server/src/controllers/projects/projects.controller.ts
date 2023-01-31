import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as projectsDto from '../../dto/projects.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private prisma: PrismaService) {
    }

    @Get('')
    async getAll(): Promise<projectsDto.publicOutput[]> {
      const res = await this.prisma.project.findMany();
      return res.map((el) => new projectsDto.publicOutput(el));
    }
  
    @Get('/:id')
    async getOne(@Param('id') id: string): Promise<projectsDto.detailsOutput> {
        const res = await this.prisma.project.findUnique({where: {id: Number(id)}});
        return new projectsDto.detailsOutput(res);
    }

    @Post('')
    async create(@Body() body: projectsDto.createInput): Promise<projectsDto.detailsOutput> {
      const res = await this.prisma.project.create({data: body});
      return new projectsDto.detailsOutput(res);
    }
}
