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
  async create(@Payload() createIdeaDto: CreateIdeaDto) {
    return await this.ideasService.create(createIdeaDto);
  }

  @MessagePattern('findAllIdeas')
  async findAll() {
    return await this.ideasService.findAll();
  }

  @MessagePattern('findOneIdea')
  async findOne(@Payload() id: ObjectId) {
    return await this.ideasService.findOne(id);
  }

  @MessagePattern('updateIdea')
  async update(
    @Payload() payload: { id: ObjectId; updateIdeaDto: UpdateIdeaDto },
  ) {
    return await this.ideasService.update(payload.id, payload.updateIdeaDto);
  }

  @MessagePattern('removeIdea')
  async remove(@Payload() id: ObjectId) {
    return await this.ideasService.remove(id);
  }
}
