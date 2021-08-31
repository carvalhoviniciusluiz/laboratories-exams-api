import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export enum TypeEnum {
  CLINICAL_ANALYSIS = 'clinical-analysis',
  IMAGE = 'image'
}

export class ExamRequest {
  @ApiProperty({
    type: String,
    description: 'The name of the exam',
    required: true
  })
  @IsNotEmpty()
  @Expose({ name: 'name' })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'The type of the exam',
    required: true
  })
  @IsNotEmpty()
  @Expose({ name: 'type' })
  @IsEnum(TypeEnum)
  type: TypeEnum;

  @ApiProperty({
    type: Number,
    description: 'The status of the exam',
    required: true
  })
  @IsOptional()
  @Expose({ name: 'status' })
  status?: number;
}
