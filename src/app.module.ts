import { Module } from '@nestjs/common';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';

@Module({
  imports: [],
  controllers: [IdeasController],
  providers: [IdeasService],
})
export class AppModule {}
