import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ProjectsController } from './controllers/projects/projects.controller';
import { TasksController } from './controllers/tasks/tasks.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectsController, TasksController],
  providers: [PrismaService],
})
export class AppModule {}
