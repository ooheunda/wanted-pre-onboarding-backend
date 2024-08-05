import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base-model.entity';
import { History } from './history.entity';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @Column('varchar', { unique: true, nullable: false })
  loginId: string;

  @Column('varchar', { nullable: false, select: false })
  password: string;

  @Column('varchar', { nullable: false })
  name: string;

  @OneToMany(() => History, (history) => history.users, {
    onDelete: 'NO ACTION',
  })
  history: History[];
}
