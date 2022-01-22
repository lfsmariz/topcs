import { Player, PlayersArticles, PlayersTopics, Topic } from '@prisma/client';
import { Article } from 'src/article/entities/article.entity';

export class FullPlayerResponseDto {
  id: number;
  username: string;
  email: string;
  createdAt: string | Date;
  playerTopics?: PlayersTopics[];
  playerArticles?: PlayersArticles[];

  constructor(
    player: Player & {
      playerTopics: (PlayersTopics & {
        topic: Topic;
      })[];
      playerArticles: (PlayersArticles & {
        article: Article;
      })[];
    },
  ) {
    this.username = player.username;
    this.email = player.email;
    this.createdAt = player.createdAt;
    this.playerTopics = player.playerTopics;
    this.playerArticles = player.playerArticles;
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
