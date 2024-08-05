import { PickType } from '@nestjs/mapped-types';
import { SignupCompanyDto } from './signup-company.dto';

export class SigninCompanyDto extends PickType(SignupCompanyDto, [
  'loginId',
  'password',
]) {}
