import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  async home(): Promise<any> {
    const res = await this.prisma.project.findMany();
    return res;
  }

  @Post('')
  async createProject(): Promise<any> {
    const res = await this.prisma.project.create({
      data: {
        name: 'test',
        status: 'new',
        version: '0.1.0',
        created: undefined,
        description: 'new project in database',
      },
    });

    return res;
  }
}
