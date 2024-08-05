import { IsNotEmpty, IsUrl } from 'class-validator';

export class ResumeLinkDto {
  /**
   * @example 'https://drive.google.com/file/d/1lmagyqZsK4h2_fp4-63fJby1aG2pKgBI/view?usp=sharing'
   */
  @IsUrl()
  @IsNotEmpty()
  resumeLink: string;
}
