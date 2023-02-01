import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ProjectsController } from './controllers/projects/projects.controller';
import { TasksController } from './controllers/tasks/tasks.controller';
import { CommentsController } from './controllers/comments/comments.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectsController, TasksController, CommentsController],
  providers: [PrismaService],
})
export class AppModule {}
