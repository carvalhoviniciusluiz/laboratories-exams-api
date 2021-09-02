import { LaboratoryEntity } from 'laboratories/laboratory.entity';
import {
  Column,
  Entity,
  BaseEntity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity('exams')
export class ExamEntity extends BaseEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'alternativeid', select: false })
  @Generated('increment')
  alternativeId?: number;

  @ManyToMany(() => LaboratoryEntity, laboratory => laboratory.exams)
  laboratories: LaboratoryEntity[];

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 17,
    nullable: false,
    default: 'clinical-analysis'
  })
  type: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1
  })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt = new Date(new Date().toUTCString());

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    type: 'timestamp with time zone'
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
    type: 'timestamp with time zone'
  })
  deletedAt: Date | null;
}
