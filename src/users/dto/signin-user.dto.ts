import { OmitType } from '@nestjs/mapped-types';
import { SignupUserDto } from './signup-user.dto';

export class SigninUserDto extends OmitType(SignupUserDto, ['name']) {}
