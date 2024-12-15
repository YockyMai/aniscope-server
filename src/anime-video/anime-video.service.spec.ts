import { Test, TestingModule } from '@nestjs/testing';
import { AnimeVideoService } from './anime-video.service';

describe('AnimeVideoService', () => {
  let service: AnimeVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeVideoService],
    }).compile();

    service = module.get<AnimeVideoService>(AnimeVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
