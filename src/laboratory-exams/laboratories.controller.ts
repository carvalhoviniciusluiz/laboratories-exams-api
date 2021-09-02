import { Body, Controller, Delete, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LaboratoryExamRequest } from './dtos';
import { LaboratoryExamsService } from './laboratory-exams.service';

@ApiTags('LABORATORY-EXAMS')
@Controller('laboratory-exams')
export class LaboratoryExamsController {
  constructor(private service: LaboratoryExamsService) {}

  @ApiOkResponse()
  @Post()
  create(@Body(ValidationPipe) laboratoryExam: LaboratoryExamRequest) {
    return this.service.createRelationship(laboratoryExam);
  }

  @ApiOkResponse()
  @Delete()
  delete(@Body(ValidationPipe) laboratoryExam: LaboratoryExamRequest) {
    return this.service.removeRelationship(laboratoryExam);
  }
}
