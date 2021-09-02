import { Global, Module } from '@nestjs/common';
import { LaboratoryExamsController } from './laboratories.controller';
import { LaboratoryExamsService } from './laboratory-exams.service';

@Global()
@Module({
  imports: [],
  controllers: [LaboratoryExamsController],
  providers: [LaboratoryExamsService],
  exports: [LaboratoryExamsService]
})
export class LaboratoryExamsModule {}
