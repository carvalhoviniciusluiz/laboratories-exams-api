import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoriesService } from './laboratories.service';

describe('LaboratoriesService', () => {
  let service: LaboratoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaboratoriesService]
    }).compile();

    service = module.get<LaboratoriesService>(LaboratoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
