import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base-model.entity';
import { Post } from './post.entity';
import { Region } from '../types/region.type';

@Entity({ name: 'companies' })
export class Company extends BaseModel {
  @Column('varchar', { nullable: false })
  name: string;

  @Column('enum', { enum: Region, nullable: false })
  region: Region;

  @Column('varchar', { nullable: false })
  location: string;

  @OneToMany(() => Post, (post) => post.company, { onDelete: 'NO ACTION' })
  posts: Post[];
}
