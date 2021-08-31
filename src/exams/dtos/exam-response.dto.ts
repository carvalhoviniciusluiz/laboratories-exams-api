import { ApiProperty } from '@nestjs/swagger';
import { classToClass, Expose, plainToClass } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { ExamEntity } from '../exam.entity';
import { TypeEnum } from './exam-request.dto';

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
    description: 'The type of the exam',
    required: true
  })
  @Expose({ name: 'type' })
  @IsEnum(TypeEnum)
  type: TypeEnum;

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

    switch (val.type) {
      case TypeEnum.CLINICAL_ANALYSIS:
        clinicalType = 'ANALISE CLINICA';
        break;
      case TypeEnum.IMAGE:
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
