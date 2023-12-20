import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIdeaDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  creator: string;

  @IsOptional()
  @IsNumber()
  problem: number;
}
