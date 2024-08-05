import { Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class UsersService {
  async signup(signupUserDto: SignupUserDto) {
    return 'This action adds a new user';
  }

  async signin(signinUserDto: SigninUserDto) {
    return `This action returns all users`;
  }
}
