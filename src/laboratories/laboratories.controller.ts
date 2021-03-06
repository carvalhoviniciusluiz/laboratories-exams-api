import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LaboratoryRequest, LaboratoryResponse, LaboratoryQuery } from './dtos';
import { LaboratoriesService } from './laboratories.service';

@ApiTags('LABORATORIES')
@Controller('laboratories')
export class LaboratoriesController {
  constructor(private readonly service: LaboratoriesService) {}

  @ApiOkResponse({ type: [LaboratoryResponse] })
  @Get()
  async getAll(@Query(ValidationPipe) queryString: LaboratoryQuery) {
    const hasName = !!queryString.name;
    const all = !hasName
      ? await this.service.findAll(queryString.status)
      : await this.service.findByName(queryString.name, queryString.status);
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
    const one = await this.service.create(laboratory);
    return LaboratoryResponse.factory(one);
  }

  @ApiOkResponse({ type: [LaboratoryResponse] })
  @Patch('/:id')
  async patch(@Param('id', ValidationPipe) id: string, @Body(ValidationPipe) laboratory: LaboratoryRequest) {
    const found = await this.service.update(id, laboratory);
    return LaboratoryResponse.factory(found);
  }

  @Delete('/:id')
  delete(@Param('id', ValidationPipe) id: string) {
    return this.service.delete(id);
  }
}
