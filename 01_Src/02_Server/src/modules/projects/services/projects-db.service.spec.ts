import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsDbService } from './projects-db.service';

describe('ProjectsDbService', () => {
  let service: ProjectsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsDbService],
    }).compile();

    service = module.get<ProjectsDbService>(ProjectsDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
