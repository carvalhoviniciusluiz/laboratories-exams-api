import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoriesController } from './laboratories.controller';
import { LaboratoriesService } from './laboratories.service';

describe('LaboratoriesController', () => {
  let controller: LaboratoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LaboratoriesController],
      providers: [LaboratoriesService]
    }).compile();

    controller = app.get<LaboratoriesController>(LaboratoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
