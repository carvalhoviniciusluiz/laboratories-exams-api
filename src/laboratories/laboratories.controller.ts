import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LaboratoryRequest } from './dtos/laboratory-request.dto';
import { LaboratoryResponse } from './dtos/laboratory-response.dto';
import { LaboratoriesService } from './laboratories.service';
import { LaboratoryEntity } from './laboratory.entity';

@ApiTags('LABORATORIES')
@Controller('laboratories')
export class LaboratoriesController {
  constructor(private readonly service: LaboratoriesService) {}

  @ApiOkResponse({ type: [LaboratoryResponse] })
  @Get()
  async getAll() {
    const all = await this.service.findAll();
    return LaboratoryResponse.factory(all);
  }

  @ApiOkResponse({ type: [LaboratoryResponse] })
  @Get('/:id')
  async getById(@Param('id', ValidationPipe) id: string) {
    const found = await this.service.findById(id);
    return LaboratoryResponse.factory(found);
  }

  @ApiOkResponse({ type: [LaboratoryResponse] })
  @Post()
  async create(@Body(ValidationPipe) laboratory: LaboratoryRequest) {
    const one = await this.service.create(laboratory as LaboratoryEntity);
    return LaboratoryResponse.factory(one);
  }

  @ApiOkResponse({ type: [LaboratoryResponse] })
  @Patch('/:id')
  async patch(@Param('id', ValidationPipe) id: string, @Body(ValidationPipe) laboratory: LaboratoryRequest) {
    const found = await this.service.update(id, laboratory as LaboratoryEntity);
    return LaboratoryResponse.factory(found);
  }

  @Delete('/:id')
  delete(@Param('id', ValidationPipe) id: string) {
    return this.service.delete(id);
  }
}
