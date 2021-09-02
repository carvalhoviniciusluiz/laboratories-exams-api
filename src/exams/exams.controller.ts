import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExamRequest, ExamResponse, ExamQuery } from './dtos';
import { ExamsService } from './exams.service';

@ApiTags('EXAMS')
@Controller('exams')
export class ExamsController {
  constructor(private readonly service: ExamsService) {}

  @ApiOkResponse({ type: [ExamResponse] })
  @Get()
  async getAll(@Query(ValidationPipe) queryString: ExamQuery) {
    const hasName = !!queryString.name;
    const all = !hasName
      ? await this.service.findAll(queryString.status)
      : await this.service.findByName(queryString.name, queryString.status);
    return ExamResponse.factory(all);
  }

  @ApiOkResponse({ type: [ExamResponse] })
  @Get('/:id')
  async getById(@Param('id', ValidationPipe) id: string) {
    const found = await this.service.findByIdRaw(id);
    return ExamResponse.factory(found);
  }

  @ApiOkResponse({ type: [ExamResponse] })
  @Post()
  async create(@Body(ValidationPipe) exam: ExamRequest) {
    const one = await this.service.create(exam);
    return ExamResponse.factory(one);
  }

  @ApiOkResponse({ type: [ExamResponse] })
  @Patch('/:id')
  async patch(@Param('id', ValidationPipe) id: string, @Body(ValidationPipe) exam: ExamRequest) {
    const found = await this.service.update(id, exam);
    return ExamResponse.factory(found);
  }

  @Delete('/:id')
  delete(@Param('id', ValidationPipe) id: string) {
    return this.service.delete(id);
  }
}
