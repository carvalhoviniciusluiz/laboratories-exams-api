import { IsNotEmpty, IsUUID } from 'class-validator';

export class RelationshipDto {
  @IsNotEmpty()
  @IsUUID()
  laboratory_id: string;

  @IsNotEmpty()
  @IsUUID()
  exam_id: string;
}
