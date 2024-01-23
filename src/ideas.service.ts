import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Idea } from './schemas/idea.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IdeasService {
  constructor(
    @InjectModel(Idea.name) private ideaModel: Model<Idea>,
    @Inject('USERS_SERVICE') private readonly userClient: ClientProxy,
    @Inject('PROBLEMS_SERVICE') private readonly problemClient: ClientProxy,
  ) {}
  async create(createIdeaDto: CreateIdeaDto) {
    try {
      const user = await firstValueFrom(
        this.userClient.send<string>('findByUsername', createIdeaDto.creator),
      );
      if (!user) throw new BadRequestException('User not exists');

      const problem = await firstValueFrom(
        this.problemClient.send<ObjectId>(
          'findOneProblem',
          createIdeaDto.problemID,
        ),
      );

      if (!problem) throw new BadRequestException('Problem not exists');

      const idea = new this.ideaModel(createIdeaDto);
      return await idea.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Idea[]> {
    return await this.ideaModel.find().exec();
  }

  async findOne(id: ObjectId) {
    return await this.ideaModel.findById(id).exec();
  }

  async update(id: ObjectId, updateIdeaDto: UpdateIdeaDto): Promise<any> {
    return await this.ideaModel.updateOne(id, updateIdeaDto);
  }

  async remove(id: ObjectId): Promise<object> {
    const objectId: ObjectId = new ObjectId(id);
    return await this.ideaModel.deleteOne(objectId);
  }
}
