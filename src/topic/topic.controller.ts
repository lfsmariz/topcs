import { Body, Controller, Post } from '@nestjs/common';
import { CreateTopicRequestDto } from './dto/topic-request.dto';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post('create')
  async create(@Body() createTopicDto: CreateTopicRequestDto): Promise<any> {
    return this.topicService.createTopic(createTopicDto);
  }
}
