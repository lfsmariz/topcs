import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RestClientService } from '../restclient/restclient.service';
import { PrismaService } from '../prisma.service';
import { CreateTopicRequestDto } from './dto/topic-request.dto';
import { shuffle } from 'src/utils/shuffleArray';

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

    const matchedYoutubeVideos =
      await this.restClientService.requestYoutubeVideos(inputTopic.name);

    const matchedDEVArticles =
      await this.restClientService.requestDEVCommunityArticles(inputTopic.name);

    const matchedDataShuffled = shuffle([
      ...matchedYoutubeVideos,
      ...matchedDEVArticles,
    ]);

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
          create: matchedDataShuffled,
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

  async getTopcs(idPlayer: number,): Promise<any> {
    const topcs = await this.prismaService.playersTopics.findMany({
      where: {
        playerId: idPlayer,
      },
      include: {
        topic: true,
      }
    });
  
    return topcs;
  }

}
