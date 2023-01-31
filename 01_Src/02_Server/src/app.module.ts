import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ProjectsController } from './controllers/projects/projects.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectsController],
  providers: [PrismaService],
})
export class AppModule {}
