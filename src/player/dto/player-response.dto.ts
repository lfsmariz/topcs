import { Player, PlayersTopics, Topic } from '@prisma/client';

export class FullPlayerResponseDto {
  id: number;
  username: string;
  email: string;
  createdAt: string | Date;

  constructor(
    player: Player,
  ) {
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
