import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Payload } from 'src/common/types/payload.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/common/entities/company.entity';
import { Repository } from 'typeorm';
import _ from 'lodash';
import { User } from 'src/common/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: Payload) {
    if (payload.isCompany) {
      const company = await this.companyRepo.findOneBy({ id: payload.sub });
      if (_.isNil(company)) {
        throw new NotFoundException();
      }
      return { isCompany: true, ...company };
    } else {
      const user = await this.userRepo.findOneBy({ id: payload.sub });
      if (_.isNil(user)) {
        throw new NotFoundException();
      }
      return { isCompany: false, ...user };
    }
  }
}
