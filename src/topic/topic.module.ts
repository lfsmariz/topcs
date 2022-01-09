import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { PrismaService } from '../prisma.service';
import { RestClientService } from '../restclient/restclient.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, PrismaService, RestClientService],
})
export class TopicModule {}
