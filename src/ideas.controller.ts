import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { ObjectId } from 'mongodb';

@Controller()
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @MessagePattern('createIdea')
  create(@Payload() createIdeaDto: CreateIdeaDto) {
    return this.ideasService.create(createIdeaDto);
  }

  @MessagePattern('findAllIdeas')
  findAll() {
    return this.ideasService.findAll();
  }

  @MessagePattern('findOneIdea')
  findOne(@Payload() id: ObjectId) {
    return this.ideasService.findOne(id);
  }

  @MessagePattern('updateIdea')
  update(@Payload() updateIdeaDto: UpdateIdeaDto) {
    return this.ideasService.update(updateIdeaDto.id, updateIdeaDto);
  }

  @MessagePattern('removeIdea')
  remove(@Payload() id: ObjectId) {
    return this.ideasService.remove(id);
  }
}
