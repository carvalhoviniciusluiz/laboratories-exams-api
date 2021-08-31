import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LaboratoryEntity } from './laboratory.entity';
import { LaboratoryNotFoundException } from './laboratoty-not-found.exception';

@Injectable()
export class LaboratoriesService {
  constructor(
    @InjectRepository(LaboratoryEntity)
    private repository: Repository<LaboratoryEntity>
  ) {}

  findAll(): Promise<LaboratoryEntity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<LaboratoryEntity> {
    const found = await this.repository.findOne(id);

    if (!found) {
      throw LaboratoryNotFoundException.withId(id);
    }

    return found;
  }

  async findByName(name: string): Promise<LaboratoryEntity> {
    const found = await this.repository.findOne({
      where: {
        name: name
      }
    });

    if (!found) {
      throw LaboratoryNotFoundException.withName(name);
    }

    return found;
  }

  async create(laboratory: LaboratoryEntity): Promise<LaboratoryEntity> {
    return await this.repository.save(laboratory);
  }

  async update(id: string, laboratory: LaboratoryEntity): Promise<LaboratoryEntity> {
    const found = await this.findById(id);

    found.name = laboratory.name;
    found.address = laboratory.address;
    found.status = laboratory.status;

    await found.save();

    return found;
  }

  async delete(id: string): Promise<void> {
    const found = await this.findById(id);

    await found.softRemove();
  }
}
