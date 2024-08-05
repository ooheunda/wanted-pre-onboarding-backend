import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Company } from 'src/common/entities/company.entity';

import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/common/decorators/user-info.decorator';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { UserRole } from 'src/common/decorators/user-role.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(UserRoleGuard)
  @UserRole('company')
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @UserInfo() company: Company,
  ) {
    return await this.postsService.create(createPostDto, company.id);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('search') search: string) {
    return await this.postsService.findAll(+page || 1, search);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.postsService.findOne(+id);
  }

  @UseGuards(UserRoleGuard)
  @UserRole('company')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UserInfo() company: Company,
  ) {
    return await this.postsService.update(+id, company.id, updatePostDto);
  }

  @UseGuards(UserRoleGuard)
  @UserRole('company')
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
    @UserInfo() company: Company,
  ) {
    return await this.postsService.remove(+id, company.id);
  }
}
