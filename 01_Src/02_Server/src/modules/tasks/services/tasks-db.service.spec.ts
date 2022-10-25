import { Test, TestingModule } from '@nestjs/testing';
import { TasksDbService } from './tasks-db.service';

describe('TasksDbService', () => {
  let service: TasksDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksDbService],
    }).compile();

    service = module.get<TasksDbService>(TasksDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
