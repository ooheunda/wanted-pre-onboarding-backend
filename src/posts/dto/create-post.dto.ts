import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  /**
   * @example '신입 웹 백엔드 개발자(Node.js)'
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  /**
   * @example '모두의 채용 플랫폼 투티드에서 신입 웹 백엔드 Node.js 개발자를 채용합니다. 자격 요건은...'
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  /**
   * @example 'nest.js'
   */
  @IsString()
  @IsNotEmpty()
  techStack: string;

  /**
   * @example 2000000
   */
  @IsNumber()
  @IsNotEmpty()
  reward: number;
}
