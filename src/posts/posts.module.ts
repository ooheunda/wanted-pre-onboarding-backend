import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/common/entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { History } from 'src/common/entities/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, History]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
