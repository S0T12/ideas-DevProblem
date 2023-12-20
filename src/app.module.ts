import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Idea, IdeaSchema } from './schemas/idea.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ideas-devProblem'),
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
  ],
  controllers: [IdeasController],
  providers: [IdeasService],
})
export class AppModule {}
