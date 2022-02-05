import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Article } from '.prisma/client';

@Injectable()
export class RestClientService {
  async requestYoutubeVideos(theme: string): Promise<Article[]> {
    const BASE_URL = 'https://www.youtube.com/watch?v=';
    const KEY_YT = process.env.YT_KEY_API;
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://youtube.googleapis.com/youtube/v3/search',
      params: {
        q: theme,
        key: KEY_YT,
        maxResults: '10',
        type: 'video',
        part: 'snippet',
      },
      headers: { Accept: 'application/json' },
    };

    let result: Article[] = [];

    try {
      const response = await axios.request(options);
      result = response.data.items.map((e) => ({
        url: BASE_URL + e.id.videoId,
        title: e.snippet.title,
        description: e.snippet.description,
        thumbnailUrl: e.snippet.thumbnails.high.url,
        isVideo: true,
      }));
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  async requestDEVCommunityArticles(tag: string): Promise<Article[]> {
    const BASE_URL = 'https://dev.to/api';
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: '/articles',
      baseURL: BASE_URL,
      params: {
        tag,
        per_page: 10,
      },
      headers: { Accept: 'application/json' },
    };

    let result: Article[] = [];

    try {
      const response = await axios.request(options);

      result = response.data.map((article) => ({
        url: article?.url || '',
        title: article?.title || '',
        description: article?.description || '',
        thumbnailUrl: article?.cover_image || '',
        isVideo: false,
      }));
    } catch (error) {
      console.error(error);
    }

    return result;
  }
}
