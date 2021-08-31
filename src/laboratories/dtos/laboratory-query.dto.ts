import { IsOptional } from 'class-validator';

export class LaboratoryQuery {
  @IsOptional()
  name: string;

  @IsOptional()
  status: number;
}
