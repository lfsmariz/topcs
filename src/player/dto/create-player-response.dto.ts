import { Player, Topic } from '@prisma/client';
import { Article } from 'src/article/entities/article.entity';

export class CreatePlayerResponseDto {
  id: number;
  username: string;
  email: string;
  createdAt: string | Date;
  playerTopics?: Topic[];
  playerArticles?: Article[];

  constructor(player: Player, listTopic: Topic[], listArticle: Article[]) {
    this.username = player.username;
    this.email = player.email;
    this.createdAt = player.createdAt;
    this.playerTopics = listTopic;
    this.playerArticles = listArticle;
  }
}
