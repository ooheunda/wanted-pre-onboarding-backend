import { Controller, Post, Body } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { SignupCompanyDto } from './dto/signup-company.dto';
import { SigninCompanyDto } from './dto/signin-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @Post('/sign-up')
  async signup(@Body() signupCompanyDto: SignupCompanyDto) {
    return this.companyService.signup(signupCompanyDto);
  }

  @Post('/sign-in')
  async signin(@Body() signinCompanyDto: SigninCompanyDto) {
    return await this.companyService.signin(signinCompanyDto);
  }
}
