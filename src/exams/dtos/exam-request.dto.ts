import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

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
  type: number;

  @ApiProperty({
    type: Number,
    description: 'The status of the exam',
    required: true
  })
  @IsOptional()
  @Expose({ name: 'status' })
  status?: number;
}
