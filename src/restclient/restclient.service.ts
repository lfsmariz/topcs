import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class RestClientService {
  async requestVideos(theme: string): Promise<string[]> {
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
      },
      headers: { Accept: 'application/json' },
    };

    let result: string[] = [];

    try {
      const response = await axios.request(options);
      result = response.data.items.map((e) => BASE_URL + e.id.videoId);
    } catch (error) {
      console.error(error);
    }

    return result;
  }
}
