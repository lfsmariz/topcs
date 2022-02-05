import { Test, TestingModule } from '@nestjs/testing';
import { RestClientService } from '../restclient/restclient.service';
import { PrismaService } from '../prisma.service';
import { TopicService } from './topic.service';
import { CreateTopicRequestDto } from './dto/topic-request.dto';
import { Article, Player, Prisma, Topic } from '.prisma/client';


describe('TopicService', () => {
  let service: TopicService;
  let prisma: PrismaService;
  let restClient: RestClientService;
  jest.mock('../prisma.service.ts');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicService, PrismaService, RestClientService],
    }).compile();

    service = module.get<TopicService>(TopicService);
    prisma = module.get<PrismaService>(PrismaService);
    restClient = module.get<RestClientService>(RestClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a topic', async () => {
    // Arrange
    const topic = {
      id: 1,
      topicName: 'fullmetal alchemist',
      createdAt: '2022-01-02T11:41:15.295Z',
      updatedAt: '2022-01-02T11:41:15.295Z',
      deleted: false,
      topicArticles: [
        {
          id: 1,
          url: 'https://www.youtube.com/watch?v=uYanD5amVYY',
          title: 'Test',
          description: 'Apenas um test',
          thumbnailUrl: '',
          isVideo: true,
          topicId: 1,
        },
      ],
    };

    const player = {
      id: 1,
      username: 'string',
      email: 'string',
      password: 'string',
      createdAt: new Date(1000),
      updatedAt: new Date(1000),
      deleted: false,
    };

    const inputTopic: CreateTopicRequestDto = {
      name: 'fullmetal alchemist',
      player: 'player',
    };

    const outputTopic = {
      id: 1,
      topicName: 'fullmetal alchemist',
      createdAt: '2022-01-02T11:41:15.295Z',
      updatedAt: '2022-01-02T11:41:15.295Z',
      deleted: false,
      topicArticles: [
        {
          id: 1,
          url: 'https://www.youtube.com/watch?v=uYanD5amVYY',
          title: 'Test',
          description: 'Apenas um test',
          thumbnailUrl: '',
          isVideo: true,
          topicId: 1,
        },
      ],
    };

    let youtubeArticle: Article[] = [
      {
        id: 1,
        topicId: 1,
        url: 'https://www.youtube.com/watch?v=uYanD5amVYY',
        title: 'Test',
        description: 'Apenas um test',
        thumbnailUrl: '',
        isVideo: true,
      }
    ];

    //Act
    jest
      .spyOn(prisma.player, 'findUnique')
      .mockImplementation(
        () => player as unknown as Prisma.Prisma__PlayerClient<Player>,
      );

    jest
      .spyOn(prisma.topic, 'create')
      .mockImplementation(
        () => topic as unknown as Prisma.Prisma__TopicClient<Topic>,
      );

    jest
      .spyOn(restClient, 'requestYoutubeVideos')
      .mockImplementation(() => youtubeArticle as unknown as Promise<Article[]>);
    
    jest
      .spyOn(restClient, 'requestDEVCommunityArticles')
      .mockImplementation(() => [] as unknown as Promise<Article[]>);

    jest
      .spyOn(prisma.playersArticles, 'createMany')
      .mockImplementation(() => youtubeArticle as unknown as any);

    //Assert
    await expect(service.createTopic(inputTopic)).resolves.toEqual(outputTopic);
  });
});
