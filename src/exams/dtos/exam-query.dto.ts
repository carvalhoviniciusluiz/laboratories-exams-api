import { IsOptional } from 'class-validator';

export class ExamQuery {
  @IsOptional()
  name: string;

  @IsOptional()
  status: number;
}
