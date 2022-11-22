import { Test, TestingModule } from '@nestjs/testing';
import { CommentsDbService } from './comments-db.service';

describe('CommentsDbService', () => {
  let service: CommentsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsDbService],
    }).compile();

    service = module.get<CommentsDbService>(CommentsDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
