import { PickType } from '@nestjs/mapped-types';
import { CreateIdeaDto } from './create-idea.dto';
import { ObjectId } from 'mongodb';

export class UpdateIdeaDto extends PickType(CreateIdeaDto, [
  'title',
  'description' as const,
]) {
  id: ObjectId;
}
