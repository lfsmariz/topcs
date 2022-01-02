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
