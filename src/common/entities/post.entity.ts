import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base-model.entity';
import { Company } from './company.entity';
import { History } from './history.entity';

@Entity({ name: 'posts' })
export class Post extends BaseModel {
  @Column('int', { nullable: false })
  companyId: number;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { nullable: false })
  description: string;

  @Column('varchar', { nullable: false })
  techStack: string;

  @Column('int', { nullable: false })
  reward: number;

  @ManyToOne(() => Company, (company) => company.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  company: Company;

  @OneToMany(() => History, (history) => history.posts, {
    onDelete: 'NO ACTION',
  })
  history: History[];
}
