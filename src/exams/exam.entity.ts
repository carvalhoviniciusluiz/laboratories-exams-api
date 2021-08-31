import {
  Column,
  Entity,
  BaseEntity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('exams')
export class ExamEntity extends BaseEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'alternativeid', select: false })
  @Generated('increment')
  alternativeId?: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1
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