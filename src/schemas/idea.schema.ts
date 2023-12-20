import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IdeaDocument = HydratedDocument<Idea>;

@Schema()
export class Idea {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  creator: string;

  @Prop()
  problem: string;

  @Prop()
  devs: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
