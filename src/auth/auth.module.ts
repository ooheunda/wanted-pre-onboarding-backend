import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

import { Company } from 'src/common/entities/company.entity';
import { User } from 'src/common/entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Company, User]),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
