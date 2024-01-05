import { Injectable } from '@nestjs/common';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Idea } from './schemas/idea.schema';
import { Model } from 'mongoose';

@Injectable()
export class IdeasService {
  constructor(@InjectModel(Idea.name) private ideaModel: Model<Idea>) {}
  async create(createIdeaDto: CreateIdeaDto) {
    try {
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

  async remove(id: ObjectId): Promise<any> {
    return await this.ideaModel.deleteOne(id);
  }
}
