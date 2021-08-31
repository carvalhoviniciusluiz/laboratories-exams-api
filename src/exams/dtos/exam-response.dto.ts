import { ApiProperty } from '@nestjs/swagger';
import { classToClass, Expose, plainToClass } from 'class-transformer';
import { ExamEntity } from '../exam.entity';

export class ExamResponse {
  @ApiProperty({
    type: String,
    description: 'The id of the exam',
    required: true
  })
  @Expose({ name: 'id' })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The name of the exam',
    required: true
  })
  @Expose({ name: 'name' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The address of the exam',
    required: true
  })
  @Expose({ name: 'address' })
  address: string;

  @ApiProperty({
    type: String,
    description: 'The status of the exam',
    required: true
  })
  @Expose({ name: 'status' })
  status: string;

  public static factory(target: ExamEntity | ExamEntity[]): ExamResponse | ExamResponse[] {
    const response = plainToClass(ExamResponse, analyzeValues(target), {
      ignoreDecorators: true
    });

    return classToClass(response, { excludeExtraneousValues: true });
  }
}

const analyzeValues = (value: ExamEntity | ExamEntity[]) => {
  const hasId = Object.keys(value)?.includes('id');

  const humanizesValue = (val: ExamEntity) => {
    let clinicalType = null;

    switch (parseInt(val.type, 10)) {
      case 1:
        clinicalType = 'ANALISE';
        break;
      case 2:
        clinicalType = 'CLINICA';
        break;
      case 3:
        clinicalType = 'IMAGEM';
        break;
      default:
        console.log(`Sorry, unknown type to ${val.type}.`);
    }

    return {
      ...val,
      type: clinicalType,
      status: !!val.status ? 'ATIVO' : 'INATIVO'
    };
  };

  const response = hasId
    ? humanizesValue(value as ExamEntity)
    : (value as ExamEntity[]).map(val => humanizesValue(val));

  return response;
};
