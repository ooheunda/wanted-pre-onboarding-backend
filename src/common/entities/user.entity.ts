import { Column, Entity } from 'typeorm';

import { BaseModel } from './base-model.entity';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @Column('varchar', { unique: true, nullable: false })
  loginId: string;

  @Column('varchar', { nullable: false, select: false })
  password: string;

  @Column('varchar', { nullable: false })
  name: string;
}
