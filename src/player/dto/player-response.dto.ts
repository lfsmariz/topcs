import {
  Article,
  Player,
  PlayersArticles,
  PlayersTopics,
  Topic,
} from '@prisma/client';

export class FullPlayerResponseDto {
  id: number;
  username: string;
  email: string;
  createdAt: string | Date;

  constructor(player: Player) {
    this.username = player.username;
    this.email = player.email;
    this.createdAt = player.createdAt;
  }
}

type PointsByTopic = {
  playerId: number;
  topic: Pick<Topic, 'id' | 'topicName'>;
  points: number;
  addAt: Date;
  removedAt: Date | null;
};

export class GetScoreResponseDto {
  score: PointsByTopic[];

  constructor(
    playerTopics: (PlayersTopics & { topic: { topicName: string } })[],
  ) {
    this.score = playerTopics.map((pt) => ({
      points: pt.points,
      addAt: pt.addAt,
      removedAt: pt.removedAt,
      topic: {
        id: pt.topicId,
        topicName: pt.topic.topicName,
      },
      playerId: pt.playerId,
    }));
  }
}

type ArticleResponse = {
  id: number;
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  read: boolean;
  readAt: Date;
  isVideo: boolean;
  topic: {
    id: number;
    name: string;
  };
};

export class GetArticlesFromPlayerResponseDto {
  articles: ArticleResponse[];

  constructor(
    articlesQuery: (Article & {
      playerArticles: PlayersArticles[];
      topic: Topic;
    })[],
  ) {
    this.articles = articlesQuery.map((aq) => ({
      id: aq.id,
      url: aq.url,
      title: aq.title,
      description: aq.description,
      thumbnailUrl: aq.thumbnailUrl,
      read: aq.playerArticles?.[0]?.read,
      readAt: aq.playerArticles?.[0]?.readAt,
      isVideo: aq.isVideo,
      topic: {
        id: aq.topic.id,
        name: aq.topic.topicName,
      },
    }));
  }
}
