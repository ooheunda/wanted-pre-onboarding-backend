import { IsNotEmpty, IsUrl } from 'class-validator';

export class ResumeLinkDto {
  @IsUrl()
  @IsNotEmpty()
  resumeLink: string;
}
