import { Injectable } from '@nestjs/common';
import { ExamsService } from 'exams/exams.service';
import { LaboratoriesService } from 'laboratories/laboratories.service';
import { LaboratoryExamNotFoundException } from './laboratoty-exam-not-found.exception';

type RelationshipProps = {
  laboratory_id: string;
  exam_id: string;
};

type IdsProps = {
  relationship_ids: RelationshipProps[];
};

@Injectable()
export class LaboratoryExamsService {
  constructor(private laboratoriesService: LaboratoriesService, private examsService: ExamsService) {}

  reduce(relationshipIds: RelationshipProps[] = []) {
    return relationshipIds.reduce((acc: any, cur: RelationshipProps) => {
      const hasVal = Object.keys(acc).includes(cur.laboratory_id);

      if (!hasVal) {
        acc[cur.laboratory_id] = [];
      }

      acc[cur.laboratory_id].push(cur.exam_id);

      return acc;
    }, {});
  }

  async createRelationship(props: IdsProps): Promise<void> {
    const { relationship_ids: relationshipIds } = props;
    const reducedIds = this.reduce(relationshipIds);

    const values = Object.keys(reducedIds);

    await Promise.all(
      values.map(async laboratoryId => {
        const examIds = reducedIds[laboratoryId];
        try {
          const laboratory = await this.laboratoriesService.findByIdOnlyActive(laboratoryId);

          for (let index = 0; index < examIds.length; index++) {
            const examId = examIds[index];
            const exam = await this.examsService.findByIdOnlyActive(examId);

            laboratory.exams.push(exam);
          }

          await laboratory.save();
        } catch (error) {
          throw new LaboratoryExamNotFoundException(error.message);
        }
      })
    );
  }

  async removeRelationship(props: IdsProps): Promise<void> {
    const { relationship_ids: relationshipIds } = props;
    const reducedIds = this.reduce(relationshipIds);

    const values = Object.keys(reducedIds);

    await Promise.all(
      values.map(async laboratoryId => {
        const examIds = reducedIds[laboratoryId];
        try {
          const laboratory = await this.laboratoriesService.findByIdOnlyActive(laboratoryId);

          laboratory.exams = laboratory.exams.filter(exam => {
            return !examIds.includes(exam.id);
          });

          await laboratory.save();
        } catch (error) {
          throw new LaboratoryExamNotFoundException(error.message);
        }
      })
    );
  }
}
