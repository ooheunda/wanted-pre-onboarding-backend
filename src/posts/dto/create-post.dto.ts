import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsString()
  @IsNotEmpty()
  techStack: string;

  @IsNumber()
  @IsNotEmpty()
  reward: number;
}
