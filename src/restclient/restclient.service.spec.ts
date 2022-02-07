import { Test, TestingModule } from '@nestjs/testing';
import { RestClientService } from './restclient.service';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');

describe('RestClientService', () => {
  let service: RestClientService;
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestClientService],
    }).compile();

    service = module.get<RestClientService>(RestClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should request youtube resolved', async () => {
    const resp = {
      kind: 'youtube#searchListResponse',
      etag: 'Ux9uUeJfM-X57vu0-g3neaSvNVI',
      nextPageToken: 'CAoQAA',
      regionCode: 'BR',
      pageInfo: {
        totalResults: 767948,
        resultsPerPage: 10,
      },
      items: [
        {
          kind: 'youtube#searchResult',
          etag: '-ErTfhtQT9ieFqwyOHdqhxcwDaQ',
          id: {
            kind: 'youtube#video',
            videoId: 'XQxitgyZ_S4',
          },
          snippet: {
            title: 'Test',
            description: 'test',
            thumbnails: {
              high: {
                url: 'a',
              },
            },
          },
        },
      ],
    };

    const mockedResponse: AxiosResponse = {
      data: resp,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    // Arrange

    mockedAxios.request.mockImplementation(
      () => mockedResponse as unknown as Promise<any>,
    );

    const inputTheme = 'testTheme';

    const output = service.requestYoutubeVideos(inputTheme);

    const expected = [
      {
        url: 'https://www.youtube.com/watch?v=XQxitgyZ_S4',
        title: 'Test',
        description: 'test',
        thumbnailUrl: 'a',
        isVideo: true,
      },
    ];

    //Assert
    await expect(output).resolves.toEqual(expected);
  });

  it('should request youtube rejected', async () => {
    const resp = {
      kind: 'youtube#searchListResponse',
      etag: 'Ux9uUeJfM-X57vu0-g3neaSvNVI',
      nextPageToken: 'CAoQAA',
      regionCode: 'BR',
      pageInfo: {
        totalResults: 767948,
        resultsPerPage: 10,
      },
      items: [],
    };

    // Arrange

    mockedAxios.request.mockRejectedValueOnce('err');

    const inputTheme = 'testTheme';

    const output = service.requestYoutubeVideos(inputTheme);

    //Assert
    await expect(output).resolves.toEqual([]);
  });
});
