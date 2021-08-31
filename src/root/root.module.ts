import { Global, Module } from '@nestjs/common';
import { RootController } from './root.controller';
import { RootService } from './root.service';

@Global()
@Module({
  imports: [],
  controllers: [RootController],
  providers: [RootService],
  exports: [RootService]
})
export class RootModule {}
