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
  /**
   * @example 'twoted'
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(14)
  loginId: string;

  /**
   * @example 'qwerty'
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(14)
  password: string;

  /**
   * @example '투티드'
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * @example 'seoul'
   */
  @IsEnum(Region)
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  region: Region;

  /**
   * @example '금천구 어딘가'
   */
  @IsString()
  @IsNotEmpty()
  location: string;
}
