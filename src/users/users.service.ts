import _ from 'lodash';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { Payload } from 'src/common/types/payload.type';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user.entity';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
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
    const { loginId, password } = signinUserDto;

    const user = await this.findUser(loginId);
    if (_.isNil(user)) {
      throw new NotFoundException('user not exists');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('wrong password');
    }

    const payload: Payload = { isCompany: false, sub: user.id, loginId };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async findUser(loginId: string) {
    const user = await this.userRepo.findOne({
      where: { loginId },
      select: ['id', 'password'],
    });

    return user;
  }
}
