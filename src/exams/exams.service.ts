import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamEntity } from './exam.entity';
import { ExamNotFoundException } from './exam-not-found.exception';
import { TypeEnum } from './dtos';

type ExamProps = {
  name: string;
  type: TypeEnum;
  status?: number;
};

const SQL_RAW = `
  SELECT exams.id as examId, exams.name as examName, exams.type as examType,
    exams.status as examStatus, laboratories.id as laboratoryId,
    laboratories.name as laboratoryName, laboratories.address as laboratoryAddress,
    laboratories.status as laboratoryStatus
  FROM exams
    LEFT JOIN laboratory_exams on laboratory_exams.exam_id = exams.id
    LEFT JOIN laboratories on laboratories.id = laboratory_exams.laboratory_id
`;

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(ExamEntity)
    private repository: Repository<ExamEntity>
  ) {}

  reduce(values: any[] = []) {
    return values.reduce((acc, cur) => {
      let exam = acc.find((item: any) => item?.id === cur.examid);

      if (!exam) {
        exam = {
          id: cur.examid,
          name: cur.examname,
          type: cur.examtype,
          status: !!cur.examstatus ? 'ATIVO' : 'INATIVO',
          laboratories: []
        };
        acc.push(exam);
      }

      if (cur.laboratoryid) {
        exam.laboratories.push({
          id: cur.laboratoryid,
          name: cur.laboratoryname,
          address: cur.laboratoryaddress,
          status: !!cur.laboratorystatus ? 'ATIVO' : 'INATIVO'
        });
      }

      return acc;
    }, []);
  }

  async findAll(status: number): Promise<ExamEntity[]> {
    const entityManager = getManager();
    const rawData = await entityManager.query(
      SQL_RAW +
        `
          WHERE exams.status = $1;
        `,
      [status]
    );

    return this.reduce(rawData);
  }

  async findById(id: string): Promise<ExamEntity> {
    const entityManager = getManager();
    const rawData = await entityManager.query(
      SQL_RAW +
        `
          WHERE exams.id = $1;
        `,
      [id]
    );

    if (!rawData) {
      throw ExamNotFoundException.withId(id);
    }

    return this.reduce(rawData);
  }

  async findByName(name: string, status = 1): Promise<ExamEntity[]> {
    const entityManager = getManager();
    const rawData = await entityManager.query(
      SQL_RAW +
        `
          WHERE exams.name ILIKE $1
          AND exams.status = $2;
        `,
      [`%${name}%`, status]
    );

    if (!rawData) {
      throw ExamNotFoundException.withName(name);
    }

    return this.reduce(rawData);
  }

  async findByIdOnlyActive(id: string): Promise<ExamEntity> {
    const found = await this.repository.findOne({
      where: {
        id,
        status: 1
      }
    });

    if (!found) {
      throw ExamNotFoundException.isInactive(id);
    }

    return found;
  }

  async create(exam: ExamProps): Promise<ExamEntity> {
    return this.repository.save({
      ...exam,
      status: exam.status?.toString() || '0'
    });
  }

  async update(id: string, exam: ExamProps): Promise<ExamEntity> {
    const found = await this.findById(id);

    found.name = exam.name;
    found.type = exam.type;
    found.status = exam.status?.toString() || '0';

    await found.save();

    return found;
  }

  async delete(id: string): Promise<void> {
    const found = await this.findById(id);

    await found.softRemove();
  }
}
