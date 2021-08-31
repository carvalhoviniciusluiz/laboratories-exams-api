import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoriesController } from './laboratories.controller';
import { LaboratoriesService } from './laboratories.service';
import { LaboratoryEntity } from './laboratory.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LaboratoryEntity])],
  controllers: [LaboratoriesController],
  providers: [LaboratoriesService],
  exports: [LaboratoriesService]
})
export class LaboratoriesModule {}
