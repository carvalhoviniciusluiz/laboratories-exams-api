import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './ormconfig';
import { RootModule } from './root/root.module';
import { LaboratoriesModule } from './laboratories/laboratories.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), RootModule, LaboratoriesModule],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule]
})
export class AppModule {}
