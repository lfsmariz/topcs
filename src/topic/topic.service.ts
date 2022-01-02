import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RestClientService } from '../restclient/restclient.service';
import { PrismaService } from '../prisma.service';
import { CreateTopicRequestDto } from './dto/topic-request.dto';

@Injectable()
export class TopicService {
  constructor(
    private prismaService: PrismaService,
    private restClientService: RestClientService,
  ) {}

  async createTopic(inputTopic: CreateTopicRequestDto): Promise<any> {
    const nowDate = new Date(Date.now());

    const nPlayer = await this.prismaService.player.findUnique({
      where: {
        username: inputTopic.player,
      },
    });

    const articles = await this.restClientService.requestVideos(
      inputTopic.name,
    );

    const articleInpt = articles.map((e) => ({
      link: e,
    }));
    const nTopic: Prisma.TopicCreateInput = {
      topicName: inputTopic.name,
      createdAt: nowDate,
      updatedAt: nowDate,
      deleted: false,
    };

    const savedTopic = await this.prismaService.topic.create({
      data: {
        ...nTopic,
        playerTopics: {
          create: {
            playerId: nPlayer.id,
            points: 0,
            addAt: nowDate,
          },
        },
        topicArticles: {
          create: articleInpt,
        },
      },
      include: {
        topicArticles: true,
      },
    });

    await this.prismaService.playersArticles.createMany({
      data: savedTopic.topicArticles.map((e) => ({
        articleId: e.id,
        playerId: nPlayer.id,
        read: false,
      })),
    });

    return savedTopic;
  }
}
