import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { RestClientService } from 'src/restclient/restclient.service';
import { ReadArticleRequestDto } from './dto/article-request.dto';

@Injectable()
export class ArticleService {
  constructor(
    private prismaService: PrismaService,
    private restClientService: RestClientService,
  ) {}

  async readArticle(dataArticle: ReadArticleRequestDto): Promise<any> {

    const player = await this.prismaService.player.findUnique({
        where: {
          username: dataArticle.player,
        },
    });

    const update = await this.prismaService.player.update({
        where: {id: player.id},
        data: {
          playerArticles: {
            update: {
              where: {
                playerId_articleId: {
                    articleId: dataArticle.idArticle,
                    playerId: player.id
                },
              },
              data: {read: true},
            },
          },
          playerTopics: {
            update: {
              where: {
                playerId_topicId: {
                    topicId: dataArticle.idTopic,
                    playerId: player.id
                },
              },
              data: {points: +10},
            },
          },
        },

        include:{
            playerArticles: true,
            playerTopics: true
        }

      });

    return update;
  }

}
