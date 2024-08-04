import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/common/entities/post.entity';
import { Company } from 'src/common/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Company])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
