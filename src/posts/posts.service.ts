import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'src/common/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/common/entities/company.entity';
import _ from 'lodash';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
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
      throw new NotFoundException();
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

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
