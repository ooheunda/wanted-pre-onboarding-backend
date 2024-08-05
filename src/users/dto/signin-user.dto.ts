import { OmitType } from '@nestjs/swagger';
import { SignupUserDto } from './signup-user.dto';

export class SigninUserDto extends OmitType(SignupUserDto, ['name']) {}
