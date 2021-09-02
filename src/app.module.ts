import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './ormconfig';
import { RootModule } from './root/root.module';
import { LaboratoriesModule } from './laboratories/laboratories.module';
import { ExamsModule } from './exams/exams.module';
import { LaboratoryExamsModule } from './laboratory-exams/laboratory-exams.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), RootModule, LaboratoriesModule, ExamsModule, LaboratoryExamsModule],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule]
})
export class AppModule {}
