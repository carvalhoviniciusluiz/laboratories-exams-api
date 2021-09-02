import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { RelationshipDto } from './relationship.dto';

export class LaboratoryExamRequest {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RelationshipDto)
  relationship_ids: RelationshipDto[];
}
