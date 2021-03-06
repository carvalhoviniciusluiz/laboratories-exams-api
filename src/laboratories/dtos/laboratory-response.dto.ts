import { ApiProperty } from '@nestjs/swagger';
import { classToClass, Expose, plainToClass } from 'class-transformer';
import { ExamEntity } from 'exams/exam.entity';
import { LaboratoryEntity } from '../laboratory.entity';

export class LaboratoryResponse {
  @ApiProperty({
    type: String,
    description: 'The id of the laboratory',
    required: true
  })
  @Expose({ name: 'id' })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The name of the laboratory',
    required: true
  })
  @Expose({ name: 'name' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The address of the laboratory',
    required: true
  })
  @Expose({ name: 'address' })
  address: string;

  @ApiProperty({
    type: String,
    description: 'The status of the laboratory',
    required: true
  })
  @Expose({ name: 'status' })
  status: string;

  @ApiProperty({
    type: String,
    description: 'The exams of the laboratory'
  })
  @Expose({ name: 'exams' })
  exams: ExamEntity;

  public static factory(target: LaboratoryEntity | LaboratoryEntity[]) {
    const response = plainToClass(LaboratoryResponse, checkSituation(target), {
      ignoreDecorators: true
    });

    return classToClass(response, { excludeExtraneousValues: true });
  }
}

const checkSituation = (value: LaboratoryEntity | LaboratoryEntity[]) => {
  const hasId = Object.keys(value)?.includes('id');

  const humanizesValue = (val: LaboratoryEntity) => {
    return {
      ...val,
      status: !!val.status ? 'ATIVO' : 'INATIVO',
      exams: val.exams?.map(exam => ({
        id: exam.id,
        name: exam.name,
        type: exam.type,
        status: !!exam.status ? 'ATIVO' : 'INATIVO'
      }))
    };
  };

  const response = hasId
    ? humanizesValue(value as LaboratoryEntity)
    : (value as LaboratoryEntity[])?.map(val => humanizesValue(val));

  return response;
};
