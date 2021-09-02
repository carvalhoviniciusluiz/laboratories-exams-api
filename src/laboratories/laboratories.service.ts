import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LaboratoryEntity } from './laboratory.entity';
import { LaboratoryNotFoundException } from './laboratoty-not-found.exception';

type LaboratoryProps = {
  name: string;
  address: string;
  status?: number;
};

@Injectable()
export class LaboratoriesService {
  constructor(
    @InjectRepository(LaboratoryEntity)
    private repository: Repository<LaboratoryEntity>
  ) {}

  findAll(status: number): Promise<LaboratoryEntity[]> {
    const statusVal = !!status ? status : 1;

    return this.repository.find({
      where: {
        status: statusVal
      }
    });
  }

  async findById(id: string): Promise<LaboratoryEntity> {
    const found = await this.repository.findOne(id);

    if (!found) {
      throw LaboratoryNotFoundException.withId(id);
    }

    return found;
  }

  async findByIdOnlyActive(id: string): Promise<LaboratoryEntity> {
    const found = await this.repository.findOne({
      where: {
        id,
        status: 1
      }
    });

    if (!found) {
      throw LaboratoryNotFoundException.isInactive(id);
    }

    return found;
  }

  async findByName(name: string, status: number): Promise<LaboratoryEntity[]> {
    const statusVal = !!status ? status : 1;

    return this.repository
      .createQueryBuilder('laboratories')
      .where(`name ILIKE :name`, {
        name: `%${name}%`
      })
      .andWhere({ status: statusVal })
      .getMany();
  }

  async create(laboratory: LaboratoryProps): Promise<LaboratoryEntity> {
    return this.repository.save({
      ...laboratory,
      status: laboratory?.status?.toString() || '0'
    });
  }

  async update(id: string, laboratory: LaboratoryProps): Promise<LaboratoryEntity> {
    const found = await this.findById(id);

    found.name = laboratory.name;
    found.address = laboratory.address;
    found.status = laboratory?.status?.toString() || '0';

    await found.save();

    return found;
  }

  async delete(id: string): Promise<void> {
    const found = await this.findById(id);

    await found.softRemove();
  }
}
