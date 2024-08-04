import { BaseModel } from './base-model.entity';

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from './company.entity';

@Entity({ name: 'posts' })
export class Post extends BaseModel {
  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { nullable: false })
  content: string;

  @Column('varchar', { nullable: false })
  techStack: string; // TODO: tech_stacks 중간 테이블 고민

  @Column('int', { nullable: false })
  reward: number;

  @Column('int', { nullable: false })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;
}
