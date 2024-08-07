import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base-model.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

import { HistoryStatus } from '../types/history-status.enum';

@Entity({ name: 'history' })
export class History extends BaseModel {
  @Column('int', { nullable: false })
  userId: number;

  @Column('int', { nullable: false })
  postId: number;

  @Column('varchar', { nullable: false })
  resumeLink: string;

  @Column('enum', {
    enum: HistoryStatus,
    default: HistoryStatus.applied,
    nullable: false,
  })
  status: HistoryStatus;

  @ManyToOne(() => Post, (post) => post.history, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  posts: Post[];

  @ManyToOne(() => User, (user) => user.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: User[];
}
