import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from 'src/common/entities/post.entity';
import { History } from 'src/common/entities/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, History]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
