import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { LaboratoryEntity } from 'laboratories/laboratory.entity';
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

  @ApiProperty({
    type: String,
    description: 'The status of the exam',
    required: true
  })
  @Expose({ name: 'status' })
  laboratories: LaboratoryEntity[];

  public static factory(target: ExamEntity | ExamEntity[]) {
    return target;
  }
}
