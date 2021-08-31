import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamEntity } from './exam.entity';
import { ExamNotFoundException } from './exam-not-found.exception';

type ExamProps = {
  name: string;
  type: number;
  status?: number;
};

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(ExamEntity)
    private repository: Repository<ExamEntity>
  ) {}

  findAll(status: number): Promise<ExamEntity[]> {
    const statusVal = !!status ? status : 1;

    return this.repository.find({
      where: {
        status: statusVal
      }
    });
  }

  async findById(id: string): Promise<ExamEntity> {
    const found = await this.repository.findOne(id);

    if (!found) {
      throw ExamNotFoundException.withId(id);
    }

    return found;
  }

  async findByName(name: string, status: number): Promise<ExamEntity[]> {
    const statusVal = !!status ? status : 1;

    return this.repository
      .createQueryBuilder('exams')
      .where(`name ILIKE :name`, {
        name: `%${name}%`
      })
      .andWhere({ status: statusVal })
      .getMany();
  }

  async create(exam: ExamProps): Promise<ExamEntity> {
    return this.repository.save({
      ...exam,
      type: exam.type.toString() || '1',
      status: exam.status?.toString() || '0'
    });
  }

  async update(id: string, exam: ExamProps): Promise<ExamEntity> {
    const found = await this.findById(id);

    found.name = exam.name;
    found.type = exam.type.toString() || '1';
    found.status = exam.status?.toString() || '0';

    await found.save();

    return found;
  }

  async delete(id: string): Promise<void> {
    const found = await this.findById(id);

    await found.softRemove();
  }
}
