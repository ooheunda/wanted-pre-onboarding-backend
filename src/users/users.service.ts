import { ConflictException, Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import _ from 'lodash';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupUserDto: SignupUserDto) {
    const { loginId, password, name } = signupUserDto;

    const user = await this.findUser(loginId);
    if (!_.isNil(user)) {
      throw new ConflictException('id already exists');
    }

    const salt = this.configService.get<number>('BCRYPT_SALT');
    const hashedPassword = await hash(password, salt);

    await this.userRepo.save({ loginId, password: hashedPassword, name });
  }

  async signin(signinUserDto: SigninUserDto) {
    return `This action returns all users`;
  }

  private async findUser(loginId: string) {
    const user = await this.userRepo.findOne({
      where: { loginId },
      select: ['password'],
    });

    return user;
  }
}
