import { IsOptional, IsString } from 'class-validator';

export class CreateIdeaDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  creator: string;

  @IsOptional()
  @IsString()
  problemID: string;
}
