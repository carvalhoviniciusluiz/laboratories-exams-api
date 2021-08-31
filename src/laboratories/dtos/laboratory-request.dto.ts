import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class LaboratoryRequest {
  @ApiProperty({
    type: String,
    description: 'The name of the laboratory',
    required: true
  })
  @IsNotEmpty()
  @Expose({ name: 'name' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The address of the laboratory',
    required: true
  })
  @IsNotEmpty()
  @Expose({ name: 'address' })
  address: string;

  @ApiProperty({
    type: String,
    description: 'The status of the laboratory',
    required: true
  })
  @IsOptional()
  @Expose({ name: 'status' })
  status?: string;
}
