import _ from 'lodash';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { SignupCompanyDto } from './dto/signup-company.dto';
import { SigninCompanyDto } from './dto/signin-company.dto';
import { Payload } from 'src/common/types/payload.type';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/common/entities/company.entity';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupCompanyDto: SignupCompanyDto) {
    const { loginId, password, name, region, location } = signupCompanyDto;

    const company = await this.findCompany(loginId);
    if (!_.isNil(company)) {
      throw new ConflictException('id already exists');
    }

    const salt = this.configService.get<number>('BCRYPT_SALT');
    const hashedPassword = await hash(password, salt);

    await this.companyRepo.save({
      loginId,
      password: hashedPassword,
      name,
      region,
      location,
    });
  }

  async signin(signinCompanyDto: SigninCompanyDto) {
    const { loginId, password } = signinCompanyDto;

    const company = await this.findCompany(loginId);
    if (_.isNil(company)) {
      throw new NotFoundException('company not exists');
    }

    if (!(await compare(password, company.password))) {
      throw new UnauthorizedException('wrong password');
    }

    const payload: Payload = { isCompany: true, sub: company.id, loginId };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async findCompany(loginId: string) {
    const company = await this.companyRepo.findOne({
      where: { loginId },
      select: ['id', 'password'],
    });

    return company;
  }
}
