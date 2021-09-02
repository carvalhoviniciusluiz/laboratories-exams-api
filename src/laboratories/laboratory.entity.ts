import { ExamEntity } from 'exams/exam.entity';
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

@Entity('laboratories')
export class LaboratoryEntity extends BaseEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'alternativeid', select: false })
  @Generated('increment')
  alternativeId: number;

  @ManyToMany(() => ExamEntity, { eager: true })
  @JoinTable({
    name: 'laboratory_exams',
    joinColumn: {
      name: 'laboratory_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'exam_id',
      referencedColumnName: 'id'
    }
  })
  exams: ExamEntity[];

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  address: string;

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
