import { PickType } from '@nestjs/mapped-types';
import { CreateIdeaDto } from './create-idea.dto';

export class UpdateIdeaDto extends PickType(CreateIdeaDto, [
  'title',
  'description' as const,
]) {}
