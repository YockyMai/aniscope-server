import { Test, TestingModule } from '@nestjs/testing';
import { AnimeVideoResolver } from './anime-video.resolver';

describe('AnimeVideoResolver', () => {
  let resolver: AnimeVideoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeVideoResolver],
    }).compile();

    resolver = module.get<AnimeVideoResolver>(AnimeVideoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
