import { Test, TestingModule } from '@nestjs/testing';
import { RestClientModule } from '../restclient/restclient.module';
import { RestClientService } from '../restclient/restclient.service';
import { PrismaService } from '../prisma.service';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { CreateTopicRequestDto } from './dto/topic-request.dto';

describe('TopicController', () => {
  let controller: TopicController;
  let service: TopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService, RestClientModule],
      controllers: [TopicController],
      providers: [TopicService, PrismaService, RestClientService],
    }).compile();

    controller = module.get<TopicController>(TopicController);
    service = module.get<TopicService>(TopicService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
          link: 'https://www.youtube.com/watch?v=uYanD5amVYY',
          topicId: 1,
        },
      ],
    };
    const inputTopic = new CreateTopicRequestDto();

    const outputTopic = {
      id: 1,
      topicName: 'fullmetal alchemist',
      createdAt: '2022-01-02T11:41:15.295Z',
      updatedAt: '2022-01-02T11:41:15.295Z',
      deleted: false,
      topicArticles: [
        {
          id: 1,
          link: 'https://www.youtube.com/watch?v=uYanD5amVYY',
          topicId: 1,
        },
      ],
    };

    //Act
    jest
      .spyOn(service, 'createTopic')
      .mockImplementation(() => topic as unknown as Promise<any>);

    const expected = controller.create(inputTopic);
    //Assert
    await expect(expected).resolves.toEqual(outputTopic);
  });
});
