import { PickType } from '@nestjs/swagger';
import { SignupCompanyDto } from './signup-company.dto';

export class SigninCompanyDto extends PickType(SignupCompanyDto, [
  'loginId',
  'password',
]) {}
