import _ from 'lodash';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from 'src/common/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async create(createPostDto: CreatePostDto, companyId: number) {
    return await this.postRepo.save({ ...createPostDto, companyId });
  }

  async findAll() {
    // TODO: (qs) pagination, search
    // TODO: raw query
    const posts = await this.postRepo
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.techStack',
        'post.reward',
        'post.createdAt',
      ])
      .leftJoin('post.company', 'company')
      .addSelect(['company.name', 'company.region'])
      .orderBy('post.createdAt', 'DESC')
      .getMany();

    if (_.isNil(posts)) return [];

    return posts.map(({ company, ...v }) => ({
      ...v,
      company_name: company.name,
      region: company.region,
    }));
  }

  async findOne(id: number) {
    const post = await this.postRepo
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.reward',
        'post.description',
        'post.techStack',
        'post.createdAt',
        'post.updatedAt',
      ])
      .leftJoin('post.company', 'company')
      .addSelect([
        'company.id',
        'company.name',
        'company.region',
        'company.location',
      ])
      .andWhere('post.id = :id', { id })
      .getOne();

    if (_.isNil(post)) {
      throw new NotFoundException('post not found');
    }

    const { company, ...postValues } = post;
    const otherPosts = await this.postRepo.find({
      where: { companyId: company.id },
      select: ['id', 'title'],
    });

    return {
      ...postValues,
      companyName: company.name,
      region: company.region,
      location: company.location,
      otherPosts,
    };
  }

  async update(id: number, companyId: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepo.findOneBy({ id });
    if (_.isNil(post)) {
      throw new NotFoundException('post not found');
    }

    if (post.companyId !== companyId) {
      throw new UnauthorizedException();
    }

    const updatedPost = Object.assign(post, updatePostDto);
    return this.postRepo.save(updatedPost);
  }

  async remove(id: number, companyId: number) {
    const post = await this.postRepo.findOneBy({ id });
    if (_.isNil(post)) {
      throw new NotFoundException('post not found');
    }

    if (post.companyId !== companyId) {
      throw new UnauthorizedException();
    }

    return this.postRepo.remove(post);
  }
}
