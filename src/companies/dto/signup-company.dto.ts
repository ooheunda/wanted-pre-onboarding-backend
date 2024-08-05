import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Region } from 'src/common/types/region.enum';

export class SignupCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(14)
  loginId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(14)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Region)
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  region: Region;

  @IsString()
  @IsNotEmpty()
  location: string;
}
