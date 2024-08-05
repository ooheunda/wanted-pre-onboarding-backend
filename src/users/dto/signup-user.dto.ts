import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupUserDto {
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
}
