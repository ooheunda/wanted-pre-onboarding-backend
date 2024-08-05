import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupUserDto {
  /**
   * @example 'ooheunda'
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
   * @example '오다은'
   */
  @IsString()
  @IsNotEmpty()
  name: string;
}
