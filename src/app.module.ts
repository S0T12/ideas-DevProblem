import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Idea, IdeaSchema } from './schemas/idea.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'PROBLEMS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'problems_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/ideas-devProblem'),
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
  ],
  controllers: [IdeasController],
  providers: [IdeasService],
})
export class AppModule {}
